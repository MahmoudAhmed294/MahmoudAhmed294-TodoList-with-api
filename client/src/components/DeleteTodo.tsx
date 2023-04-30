import { TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDeleteTodoMutation } from '../api/todo.api';
import { useAppDispatch } from '../store/useStore';
import { deleteTodoFromList } from '../store/todoSlice';
import Loader from './Loader';

type Props = {
  id: string;
};

const DeleteTodo = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const [deleteTodo, { data, isLoading, error }] = useDeleteTodoMutation();

  const handleDeleteTodo = () => {
    console.log(id);

    if (id) {
      deleteTodo(id);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(deleteTodoFromList(id));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <>
      {isLoading ? <Loader /> : ''}
      <TouchableOpacity onPress={handleDeleteTodo}>
        <AntDesign name="delete" size={20} color="#dc3545" />
      </TouchableOpacity>
    </>
  );
};

export default DeleteTodo;
