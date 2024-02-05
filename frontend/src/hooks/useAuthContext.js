import { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext.js';

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
