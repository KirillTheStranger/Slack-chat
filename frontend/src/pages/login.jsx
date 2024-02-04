import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormGroup, FormControl, Button, FormFloating, FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginComponent from '../components/loginComponent';
import avatar from '../assets/loginPage/avatar.png';
import AuthContext from '../context/auth/authContext.js';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    username: Yup.string().required(t('loginPage.errors.usernameRequier')),
    password: Yup.string().required(t('loginPage.errors.passwordRequired')),
  });

  const handleLogin = async (values) => axios.post('/api/v1/login', { ...values });

  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    handleLogin(values)
      .then(({ data }) => {
        const { token, username } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setSubmitting(false);
        setAuth(true);
        navigate('/');
      })
      .catch((error) => {
        setSubmitting(false);
        const { status } = error.response;

        switch (status) {
          case 0: {
            setErrors({ password: t('loginPage.errors.network') });
            break;
          }
          case 401: {
            setErrors({ password: t('loginPage.errors.wrongData') });
            break;
          }
          default: {
            setErrors({ password: t('loginPage.errors.unknown') });
            break;
          }
        }
      });
  };

  return (
    <LoginComponent avatar={avatar}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleFormSubmit}
        validationSchema={loginSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          errors, values, handleChange, handleBlur, isSubmitting,
        }) => (
          <Form className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">{t('loginPage.form.header')}</h1>

            <FormFloating className="mb-3">
              <FormControl
                name="username"
                id="username"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={!!errors.password} // ошибки из password, чтобы не придумывать велосипед
                autoFocus
              />
              <FormLabel htmlFor="username">{t('loginPage.form.username')}</FormLabel>
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
              <FormLabel htmlFor="password">{t('loginPage.form.password')}</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.password}</FormGroup>
            </FormFloating>

            <Button type="submit" variant="outline-primary" className="w-100" disabled={isSubmitting}>
              {t('loginPage.form.loginButton')}
            </Button>
          </Form>
        )}
      </Formik>
    </LoginComponent>
  );
};

export default Login;