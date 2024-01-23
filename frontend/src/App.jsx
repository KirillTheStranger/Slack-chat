import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import { createContext, useState } from 'react';
import NavBar from './containers/NavBar.jsx';

export const AuthContext = createContext({ authStatus: false, setAuthStatus: () => {} });

const App = () => {
  const token = localStorage.getItem('token');
  const [authStatus, setAuthStatus] = useState(!!token);

  return (
    <NavBar>
      <AuthContext.Provider value={{ setAuthStatus }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={authStatus ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </NavBar>
  );
};

export default App;
