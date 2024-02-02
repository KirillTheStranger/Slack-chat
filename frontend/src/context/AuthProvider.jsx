import { useState, useMemo, useCallback } from 'react';
import AuthContext from './AuthContext.js';

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const [authStatus, setAuthenticationStatus] = useState(!!token);

  const setAuthStatus = useCallback((status) => setAuthenticationStatus(status), []);
  const logOut = useCallback(() => localStorage.clear(), []);

  const contextValue = useMemo(
    () => ({ authStatus, setAuthStatus, logOut }),
    [authStatus, setAuthStatus],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
