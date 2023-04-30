import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import {loginSlice} from "./loginSlice";

import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { authApi } from '../api/login.api';
import {todoSlice} from "./todoSlice";
import { todoApi } from "../api/todo.api";


 const store = configureStore({
  reducer: {
    user:loginSlice.reducer,
    todoList:todoSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(authApi.middleware ,todoApi.middleware),

});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export default store;
