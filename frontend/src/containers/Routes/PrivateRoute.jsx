import { useContext } from 'react';
import AuthContext from '../../context/AuthContext.js';
import Home from '../../pages/Home.jsx';

const PrivateRoute = ({ children }) => {
  const { authStatus } = useContext(AuthContext);

  return authStatus ? <Home /> : children;
};
export default PrivateRoute;
