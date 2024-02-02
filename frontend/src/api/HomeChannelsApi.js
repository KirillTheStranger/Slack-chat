import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeChannelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
    tagTypes: ['Channels'],
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        method: 'POST',
        body: newChannel,
        invalidatesTags: ['Channels'],
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        url: id,
        method: 'PATCH',
        body,
        invalidatesTags: ['Channels'],
      }),
    }),
    removeChannel: builder.mutation({
      query: ({ id }) => ({
        url: id,
        method: 'DELETE',
        invalidatesTags: ['Channels'],
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = homeChannelsApi;
