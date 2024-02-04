import { useState, useMemo, useCallback } from 'react';
import AuthContext from './authContext.js';
import useGetToken from '../../hooks/useGetToken.js';

const AuthProvider = ({ children }) => {
  const token = useGetToken();
  const [isAuthed, setAuthentication] = useState(!!token);

  const setAuth = useCallback((status) => setAuthentication(status), []);
  const logOut = useCallback(() => {
    localStorage.clear();
    setAuth(false);
  }, [setAuth]);

  const contextValue = useMemo(
    () => ({ isAuthed, setAuth, logOut }),
    [isAuthed, setAuth, logOut],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
