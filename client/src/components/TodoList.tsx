import { ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import Todo from './Todo';
import { useTodoListQuery } from '../api/todo.api';
import { Text } from 'react-native-paper';
import { ITodo } from '../model/todo';
import Loader from './Loader';
import { useAppDispatch, useAppSelector } from '../store/useStore';
import { getTodoList, setTodoList } from '../store/todoSlice';

type Props = {};

const TodoList = (props: Props) => {
  const { data, isLoading, error } = useTodoListQuery(null);
  const dispatch = useAppDispatch();
  const todoList = useAppSelector(getTodoList);

  useEffect(() => {
    if (data) {
      dispatch(setTodoList(data));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);


  return (
    <ScrollView>
      {isLoading ? (
        <Loader />
      ) : todoList.length !== 0 ? (
        todoList.map((value: ITodo) => (
          <Todo status={value.status} title={value.title} id={value.id} key={value.id} />
        ))
      ) : (
        <Text variant="displaySmall">no Task </Text>
      )}
    </ScrollView>
  );
};

export default TodoList;
