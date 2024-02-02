import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import App from './App.jsx';
import store from './store/index.js';
import i18n from './i18next.js';
import AuthProvider from './context/auth/AuthProvider.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const init = () => (
  <Provider store={store}>
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nextProvider>
    </React.StrictMode>
  </Provider>
);

export default init;
