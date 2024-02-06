import { configureStore } from '@reduxjs/toolkit';
import { homeChannelsApi } from '../api/homeChannelsApi';
import { homeMessagessApi } from '../api/homeMessagesApi';
import { authenticateApi } from '../api/authenticateApi.js';
import appReducer from './slices/app.js';
import authReducer from './slices/auth.js';

export default configureStore({
  reducer: {
    channels: homeChannelsApi.reducer,
    messages: homeMessagessApi.reducer,
    authentication: authenticateApi.reducer,
    app: appReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(homeChannelsApi.middleware, homeMessagessApi.middleware, authenticateApi.middleware),
});
