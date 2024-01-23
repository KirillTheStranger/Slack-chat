import { configureStore } from '@reduxjs/toolkit';
import { homeChannelsApi } from '../api/HomeChannelsApi';
import { homeMessagessApi } from '../api/HomeMessagesApi';

export default configureStore({
  reducer: {
    channels: homeChannelsApi.reducer,
    messages: homeMessagessApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(homeChannelsApi.middleware, homeMessagessApi.middleware),
});
