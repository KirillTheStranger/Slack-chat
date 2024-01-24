import { Formik, Field, Form } from 'formik';
import loginPageAvatar from '../assets/login_page_avatar.jpg';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Login = () => {
  const { setAuthStatus } = useContext(AuthContext);

  const [isInvalid, setInvalidation] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setInvalidation(false);
    try {
      const {
        data: { token },
      } = await axios.post('/api/v1/login', { ...values });
      localStorage.setItem('token', token);
      setAuthStatus(true);
      navigate('/');
    } catch (error) {
      setInvalidation(true);
      setAuthStatus(false);
    }
  };

  const errorBlock = <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>;

  const form = (
    <Formik initialValues={{ username: '', password: '' }} onSubmit={(values) => handleLogin(values)}>
      <Form className="col-12 col-md-6 mt-3 mt-mb-0">
        <h1 className="text-center mb-4">Войти</h1>
        <div className="form-floating mb-3">
          <Field
            type="name"
            name="username"
            className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
            autoComplete="username"
            required
            placeholder="Ваш ник"
            id="username"
          />
          <label htmlFor="username">Ваш ник</label>
        </div>
        <div className="form-floating mb-4">
          <Field
            type="password"
            name="password"
            className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
            autoComplete="current-password"
            required
            placeholder="Пароль"
            id="password"
          />
          <label htmlFor="password">Password</label>
          {isInvalid && errorBlock}
        </div>
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
          Войти
        </button>
      </Form>
    </Formik>
  );

  const container = (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginPageAvatar} alt="Войти" className="rounded-circle" />
              </div>
              {form}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return container;
};

export default Login;
