import { configureStore } from '@reduxjs/toolkit';
import { homeChannelsApi } from '../api/homeChannelsApi';
import { homeMessagessApi } from '../api/homeMessagesApi';
import appReducer from './slices/app.js';

export default configureStore({
  reducer: {
    channels: homeChannelsApi.reducer,
    messages: homeMessagessApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(homeChannelsApi.middleware, homeMessagessApi.middleware),
});
