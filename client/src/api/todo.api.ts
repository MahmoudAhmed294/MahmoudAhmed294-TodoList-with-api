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
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getUser(getState()).token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    todoList: builder.query<ITodo[], null>({
      query: () => ({
        url: `/todo/all`,
        method: 'get',
      }),
    }),
    addTodo: builder.mutation<ITodo, string>({
      query: (payload) => ({
        url: `/todo`,
        method: 'post',
        body: { title: payload },
      }),
    }),

    deleteTodo: builder.mutation<ITodo, string>({
      query: (payload) => ({
        url: `/todo/${payload}`,
        method: 'delete',
      }),
    }),

    updateTitle: builder.mutation<ITodo, {title:string, id:string}>({
      query: (payload) => ({
        url: `/todo/${payload.id}`,
        method: 'put',
        body: { title: payload.title },
      }),
    }),
    updateStatus: builder.mutation<ITodo, string>({
      query: (payload) => ({
        url: `/todo/${payload}`,
        method: 'patch',
      }),
    }),
  }),
});

export const { useTodoListQuery, useAddTodoMutation, useDeleteTodoMutation ,useUpdateTitleMutation , useUpdateStatusMutation } = todoApi;
