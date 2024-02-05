import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import avatar from '../assets/notFoundPage/avatar.png';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center mt-5">
      <img src={avatar} alt="Страница не найдена" className="img-fluid" />
      <h1 className="h4 text-muted">{t('notFoundPage.header')}</h1>
      <p className="text-muted">
        {t('notFoundPage.body')}
        {' '}
        <Link to="/">{t('notFoundPage.link')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
