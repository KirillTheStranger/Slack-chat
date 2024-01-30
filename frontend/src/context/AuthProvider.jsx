import { useState, useMemo } from 'react';
import AuthContext from './AuthContext.js';

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const [authStatus, setAuthStatus] = useState(!!token);

  const contextValue = useMemo(() => ({ authStatus, setAuthStatus }), [authStatus, setAuthStatus]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
