import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeMessagessApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (token) => ({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        method: 'POST',
        body: newMessage,
      }),
    }),
    editMessage: builder.mutation({
      query: (id, editedMessage) => ({
        url: id,
        method: 'POST',
        body: editedMessage,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = homeMessagessApi;
