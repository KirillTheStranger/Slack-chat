import { useContext } from 'react';
import AuthContext from '../context/auth/authContext.js';

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
