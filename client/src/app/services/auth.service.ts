import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginRequest } from '../interfaces/login.interface'
import { IRegisterRequest } from '../interfaces/register.interface'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3100',
  }),
  endpoints: (build) => ({
    login: build.mutation<any, ILoginRequest>({
      query: ({ email, password }) => ({
        url: `/auth/login`,
        method: 'POST',
        body: { email, password },
      }),
    }),
    create: build.mutation<any, IRegisterRequest>({
      query: ({ name, email, password }) => ({
        url: `/user/create`,
        method: 'POST',
        body: { name, email, password },
      }),
    }),
  }),
}) 

export const { useLoginMutation, useCreateMutation } = authAPI
