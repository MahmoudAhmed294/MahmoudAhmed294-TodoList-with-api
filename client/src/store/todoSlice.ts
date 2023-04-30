import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ITodo, ITodoList } from '../model/todo';

const initialState: ITodoList = {
  todoList: [],
};

export const todoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTodoList: (state, action: PayloadAction<ITodo[]>) => {
      state.todoList = action.payload;
    },

    addTodoToList: (state, action: PayloadAction<ITodo>) => {
      state.todoList.push(action.payload);
    },
    deleteTodoFromList: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter((value) => value.id !== action.payload);
    },
    updateTodoTitleInList: (state, action: PayloadAction<ITodo>) => {
      
      const oldTodoIndex = state.todoList.findIndex((item) => item.id === action.payload.id);
       state.todoList.splice(oldTodoIndex, 1, action.payload);
    },
  },
});

export const { setTodoList, addTodoToList, deleteTodoFromList ,updateTodoTitleInList } = todoSlice.actions;

export const getTodoList = (state: RootState) => state.todoList.todoList;

export default todoSlice.reducer;
