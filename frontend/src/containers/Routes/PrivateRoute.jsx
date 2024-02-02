import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext.js';

const PrivateRoute = ({ children }) => {
  const { authStatus } = useContext(AuthContext);

  return authStatus ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
