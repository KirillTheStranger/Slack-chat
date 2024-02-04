import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext.js';

const PrivateRoute = ({ children }) => {
  const { isAuthed } = useContext(AuthContext);

  return isAuthed ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
