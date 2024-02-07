import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  FormGroup, FormControl, Button, FormFloating, FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import SignupComponent from '../components/SignupComponent.jsx';
import avatar from '../assets/signupPage/avatar.png';
import useAuthContext from '../hooks/useAuthContext.js';
import { useSignUpMutation } from '../api/authenticateApi.js';
import useLocalStorage from '../hooks/useLocalstorage.js';
import { setUserData } from '../store/slices/auth.js';

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setAuth } = useAuthContext();
  const [signUp] = useSignUpMutation();

  const dispatch = useDispatch();

  const setLocalStorageItem = useLocalStorage('set');

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('signupPage.errors.shortUserName'))
      .max(20, t('signupPage.errors.longUserName'))
      .required(t('signupPage.errors.requiredField')),
    password: Yup.string().min(6, t('signupPage.errors.shortPassword')).required(t('signupPage.errors.requiredField')),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], t('signupPage.errors.passwordMatch')).required(t('signupPage.errors.requiredField')),
  });

  const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { token, username } = await signUp({ ...values }).unwrap();

      setLocalStorageItem('token', token);
      setLocalStorageItem('username', username);
      dispatch(setUserData({ token, username }));

      setSubmitting(false);
      setAuth(true);

      navigate('/');
    } catch (error) {
      setSubmitting(false);

      const { status } = error;

      switch (status) {
        case 0: {
          setErrors({ username: ' ', password: ' ', confirmPassword: t('signupPage.errors.network') });
          break;
        }
        case 409: {
          setErrors({ username: ' ', password: ' ', confirmPassword: t('signupPage.errors.userExists') });
          break;
        }
        default: {
          setErrors({ username: ' ', password: ' ', confirmPassword: t('signupPage.errors.unknown') });
          break;
        }
      }
    }
  };

  return (
    <SignupComponent avatar={avatar}>
      <Formik
        initialValues={{ username: '', password: '', confirmPassword: '' }}
        onSubmit={handleFormSubmit}
        validationSchema={signupSchema}
        validateOnChange={false}
        validateOnBlur
      >
        {({
          errors, values, handleChange, handleBlur, isSubmitting,
        }) => (
          <Form className="w-50">
            <h1 className="text-center mb-4">{t('signupPage.form.header')}</h1>
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
              <FormLabel htmlFor="username">{t('signupPage.form.username')}</FormLabel>
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
              <FormLabel htmlFor="password">{t('signupPage.form.password')}</FormLabel>
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
              <FormLabel htmlFor="confirmPassword">{t('signupPage.form.passwordConfirm')}</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.confirmPassword}</FormGroup>
            </FormFloating>
            <Button type="submit" variant="outline-primary" className="w-100" disabled={isSubmitting}>
              {t('signupPage.form.registrationButton')}
            </Button>
          </Form>
        )}
      </Formik>
    </SignupComponent>
  );
};

export default SignUp;
