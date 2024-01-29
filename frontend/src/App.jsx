import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SingUp.jsx';
import NotFound from './pages/NotFound.jsx';
import NavBar from './components/NavBar.jsx';
import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const AuthContext = createContext({ authStatus: false, setAuthStatus: () => {} });

const App = () => {
  const token = localStorage.getItem('token');
  const [authStatus, setAuthStatus] = useState(!!token);

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
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
    </AuthContext.Provider>
  );
};

export default App;
