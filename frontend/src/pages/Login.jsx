import LoginComponent from '../components/LoginComponent';
import avatar from '../assets/loginPage/avatar.jpg';
import { AuthContext } from '../App';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormGroup, FormControl, Button, FormFloating, FormLabel } from 'react-bootstrap';

const Login = () => {
  const { setAuthStatus } = useContext(AuthContext);

  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const handleLogin = async (values) => await axios.post('/api/v1/login', { ...values });

  return (
    <LoginComponent avatar={avatar}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          handleLogin(values)
            .then(({ data }) => {
              const { token, username } = data;
              localStorage.setItem('token', token);
              localStorage.setItem('username', username);
              setSubmitting(false);
              setAuthStatus(true);
              navigate('/');
            })
            .catch(() => {
              setErrors({ password: 'Неверные имя пользователя или пароль' });
              setSubmitting(false);
            });
        }}
        validationSchema={loginSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, values, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">Войти</h1>

            <FormFloating className="mb-3">
              <FormControl
                name="username"
                id="username"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={!!errors.password} // добавил ошибки из password, чтобы не придумывать велосипед
                autoFocus
              />
              <FormLabel htmlFor="username">Имя пользователя</FormLabel>
            </FormFloating>

            <FormFloating className="mb-3">
              <FormControl
                type="password"
                name="password"
                id="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.password}</FormGroup>
            </FormFloating>

            <Button type="submit" variant="outline-primary" className="w-100" disabled={isSubmitting}>
              Войти
            </Button>
          </form>
        )}
      </Formik>
    </LoginComponent>
  );
};

export default Login;
