import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, MD3Colors, TextInput } from 'react-native-paper';
import { useAddTodoMutation } from '../api/todo.api';
import { useAppDispatch } from '../store/useStore';
import { addTodoToList } from '../store/todoSlice';
import Loader from './Loader';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();

  const [addTodo, { data, isLoading, error }] = useAddTodoMutation();
  const handleAddTodo = () => {
    if (title !== '') {
      addTodo(title);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(addTodoToList(data));
      setTitle('');
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
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            mode="outlined"
            placeholder="Add todo"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <IconButton
            icon="plus"
            mode={'contained'}
            iconColor={MD3Colors.primary100}
            containerColor={MD3Colors.primary40}
            size={30}
            onPress={handleAddTodo}
          />
        </View>
      </View>
    </>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  row: {
    backgroundColor: '#fff',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 28,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
});
