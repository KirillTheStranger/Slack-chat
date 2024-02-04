import { useState, useMemo, useCallback } from 'react';
import AuthContext from './authContext.js';
import useLocalStorage from '../../hooks/useLocalstorage.js';

const AuthProvider = ({ children }) => {
  const token = useLocalStorage('get')('token');
  const clearLocalStorage = useLocalStorage('clear');
  const [isAuthed, setAuthentication] = useState(!!token);

  const setAuth = useCallback((status) => setAuthentication(status), []);
  const logOut = useCallback(() => {
    clearLocalStorage();
    setAuth(false);
  }, [setAuth, clearLocalStorage]);

  const contextValue = useMemo(
    () => ({ isAuthed, setAuth, logOut }),
    [isAuthed, setAuth, logOut],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
