import { Provider, ErrorBoundary } from '@rollbar/react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import NotFound from './pages/NotFound.jsx';
import Home from './pages/Home.jsx';
import NavBar from './components/NavBar.jsx';
import PrivateRoute from './containers/Routes/PrivateRoute.jsx';
import AppContainer from './components/AppContainer.jsx';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <BrowserRouter>
        <AppContainer>
          <NavBar />
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppContainer>
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);

export default App;
