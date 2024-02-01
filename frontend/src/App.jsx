import { Provider, ErrorBoundary } from '@rollbar/react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/SingUp.jsx';
import NotFound from './pages/NotFound.jsx';
import Home from './pages/Home.jsx';
import NavBar from './components/NavBar.jsx';
import PrivateRoute from './containers/Routes/PrivateRoute.jsx';

const rollbarConfig = {
  accessToken: '15d745d27bd74434b0a931076eb7b6ec',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <NavBar>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NavBar>
    </ErrorBoundary>
  </Provider>
);
export default App;
