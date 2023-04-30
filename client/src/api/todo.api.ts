import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodo } from '../model/todo';
import { API_URL } from '.';
import { getUser } from '../store/loginSlice';
/**
 * NOTE
 * http://10.0.2.2:5000 ip is refer to the pc localhost not the emulator localhost
 * change to http://localhost:5000 if you will test on web
 */

export const todoApi = createApi({
  reducerPath: 'todo',

  baseQuery: fetchBaseQuery({
    baseUrl:  API_URL,
    prepareHeaders:(headers, { getState }:any) =>{
      const token = getUser(getState()).token; 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;

    }
  }),
  endpoints: (builder) => ({
    todoList: builder.query<ITodo[], null>({
      query: () => ({
        url: `/todo/all`,
        method: 'get',
      }),
    }),

  }),
});

export const { useTodoListQuery } = todoApi;
