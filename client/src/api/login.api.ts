import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogin, IRegister, IUser } from '../model/auth';
import { API_URL } from '.';

/**
 * NOTE
 * http://10.0.2.2 ip is refer to the pc localhost not the emulator localhost
 * change to http://localhost if you will test on web
 */

export const authApi = createApi({
  reducerPath: 'auth',

  baseQuery: fetchBaseQuery({
    baseUrl:  API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IUser, ILogin>({
      query: (payload) => ({
        url: `/auth/login`,
        method: 'post',
        body: payload,
      }),
    }),
    register: builder.mutation<IUser, IRegister>({
      query: (payload) => ({
        url: `/auth/register`,
        method: 'post',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
