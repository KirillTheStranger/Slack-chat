import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import filter from 'leo-profanity';
import App from './app.jsx';
import store from './store/index.js';
import AuthProvider from './context/auth/authProvider.jsx';
import SocketProvider from './context/socket/socketProvider.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import resources from './locales/index.js';

const init = async () => {
  const socket = io();

  const i18n = i18next.createInstance();

  await i18n.init({
    lng: 'ru',
    resources,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

  filter.loadDictionary('ru');
  filter.loadDictionary('en');

  return (
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
};

export default init;
