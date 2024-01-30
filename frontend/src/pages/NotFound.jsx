import avatar from '../assets/notFoundPage/avatar.png';

const NotFound = () => (
  <div className="text-center mt-5">
    <img src={avatar} alt="Страница не найдена" className="img-fluid" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      {' '}
      <a href="/">на главную страницу</a>
    </p>
  </div>
);

export default NotFound;
