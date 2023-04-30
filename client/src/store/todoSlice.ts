import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ITodo, ITodoList } from "../model/todo";


const initialState:ITodoList = {
  todoList:  [],
};

export const todoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTodoList:(state , action:PayloadAction<ITodo[]>)=>{
        state.todoList = action.payload
    }
  },
});

export const { setTodoList } = todoSlice.actions;

export const getTodoList =(state: RootState) => state.todoList.todoList;

export default todoSlice.reducer;
