import { useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AuthContext from './AuthContext.js';
import useLocalStorage from '../../hooks/useLocalstorage.js';
import { setUserData } from '../../store/slices/auth.js';

const AuthProvider = ({ children }) => {
  const token = useLocalStorage('get')('token');
  const clearLocalStorage = useLocalStorage('clear');
  const [isAuthed, setAuthentication] = useState(!!token);
  const dispatch = useDispatch();

  const setAuth = useCallback((status) => setAuthentication(status), []);
  const logOut = useCallback(() => {
    clearLocalStorage();
    setAuth(false);
    dispatch(setUserData({ token: null, username: null }));
  }, [setAuth, clearLocalStorage, dispatch]);

  const contextValue = useMemo(() => ({ isAuthed, setAuth, logOut }), [isAuthed, setAuth, logOut]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
