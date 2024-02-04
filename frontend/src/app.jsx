import { Provider, ErrorBoundary } from '@rollbar/react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Login from './pages/login.jsx';
import SignUp from './pages/signUp.jsx';
import NotFound from './pages/notFound.jsx';
import Home from './pages/home.jsx';
import NavBar from './components/navBar.jsx';
import PrivateRoute from './containers/Routes/privateRoute.jsx';
import AppContainer from './components/appContainer.jsx';

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
