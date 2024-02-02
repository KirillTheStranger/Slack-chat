import { createContext } from 'react';

export default createContext({
  authStatus: false,
  setAuthStatus: () => {},
  logOut: () => {},
});
