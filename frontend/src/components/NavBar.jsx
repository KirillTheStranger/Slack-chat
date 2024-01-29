import { AuthContext } from '../App';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

const NavBar = ({ children }) => {
  const { authStatus, setAuthStatus } = useContext(AuthContext);
  const { t } = useTranslation();

  const handleExit = () => {
    localStorage.clear();
    setAuthStatus(false);
  };

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            Hexlet Chat
          </a>
          {authStatus && (
            <button className="btn btn-primary" onClick={handleExit}>
              {t('homePage.logOutButton')}
            </button>
          )}
        </div>
      </nav>
      {children}
    </div>
  );
};

export default NavBar;
