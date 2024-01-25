import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeChannelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        method: 'POST',
        body: newChannel,
      }),
    }),
    editChannel: builder.mutation({
      query: (id, editedChannel) => ({
        url: id,
        method: 'POST',
        body: editedChannel,
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

export const { useGetChannelsQuery } = homeChannelsApi;
