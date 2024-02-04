import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext.js';

const NavBar = ({ children }) => {
  const { isAuthed, logOut } = useAuthContext();
  const { t } = useTranslation();

  const handleExit = () => logOut();

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Hexlet Chat
          </Link>
          {isAuthed && (
            <button type="button" className="btn btn-primary" onClick={handleExit}>
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
