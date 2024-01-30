import { useContext } from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SingUp.jsx';
import NotFound from './pages/NotFound.jsx';
import NavBar from './components/NavBar.jsx';
import AuthContext from './context/AuthContext.js';

const rollbarConfig = {
  accessToken: '15d745d27bd74434b0a931076eb7b6ec',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

const App = () => {
  const { authStatus } = useContext(AuthContext);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <NavBar>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={authStatus ? <Home /> : <Navigate to="/login" />} />
              <Route path="/login" element={authStatus ? <Home /> : <Login />} />
              <Route path="/signup" element={authStatus ? <Home /> : <SignUp />} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NavBar>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
