import { configureStore } from '@reduxjs/toolkit';
import { homeChannelsApi } from '../api/HomeChannelsApi';
import { homeMessagessApi } from '../api/HomeMessagesApi';
import appReducer from './slices/app.js';

export default configureStore({
  reducer: {
    channels: homeChannelsApi.reducer,
    messages: homeMessagessApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(homeChannelsApi.middleware, homeMessagessApi.middleware),
});
