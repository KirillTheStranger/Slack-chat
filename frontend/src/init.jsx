import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import App from './app.jsx';
import store from './store/index.js';
import i18n from './i18next.js';
import AuthProvider from './context/auth/authProvider.jsx';
import SocketProvider from './context/socket/socketProvider.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io();

const init = () => (
  <Provider store={store}>
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <SocketProvider socket={socket}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SocketProvider>
      </I18nextProvider>
    </React.StrictMode>
  </Provider>
);

export default init;
