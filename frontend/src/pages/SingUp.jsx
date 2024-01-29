import SignupComponent from '../components/SignupComponent.jsx';
import avatar from '../assets/signupPage/avatar.jpg';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormGroup, FormControl, Button, FormFloating, FormLabel } from 'react-bootstrap';

const SignUp = () => {
  const navigate = useNavigate();

  const signupSchema = Yup.object().shape({
    username: Yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
    password: Yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
  });

  const handleSignup = async (values) => await axios.post('/api/v1/signup', { ...values });

  return (
    <SignupComponent avatar={avatar}>
      <Formik
        initialValues={{ username: '', password: '', confirmPassword: '' }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          handleSignup(values)
            .then(({ data }) => {
              const { token, username } = data;
              localStorage.setItem('token', token);
              localStorage.setItem('username', username);
              setSubmitting(false);
              navigate('/');
            })
            .catch(() => {
              setErrors({ username: ' ', password: ' ', confirmPassword: 'Такой пользователь уже существует' });
              setSubmitting(false);
            });
        }}
        validationSchema={signupSchema}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {({ errors, values, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="w-50">
            <h1 className="text-center mb-4">Регистрация</h1>

            <FormFloating className="mb-3">
              <FormControl
                name="username"
                id="username"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={!!errors.username}
                autoFocus
              />
              <FormLabel htmlFor="username">Имя пользователя</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.username}</FormGroup>
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

            <FormFloating className=" mb-4">
              <FormControl
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
              />
              <FormLabel htmlFor="confirmPassword">Подтвердите пароль</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.confirmPassword}</FormGroup>
            </FormFloating>
            <Button type="submit" variant="outline-primary" className="w-100" disabled={isSubmitting}>
              Зарегистрироваться
            </Button>
          </form>
        )}
      </Formik>
    </SignupComponent>
  );
};

export default SignUp;
