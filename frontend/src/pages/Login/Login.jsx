import { Formik, Field, Form } from 'formik';

const Login = () => {
  const form = (
    <Formik initialValues={{ email: '', password: '' }} onSubmit>
      {() => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field type="name" name="username" className="form-control" autoComplete="username" required="" placeholder="Ваш ник" id="username" />
            <label htmlFor="username">Ваш ник</label>
          </div>
          <div className="form-floating mb-4">
            <Field type="password" name="password" className="form-control" autoComplete="current-password" required="" placeholder="Пароль" id="password" />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );

  const container = (
    <div className="col-12 col-md-8 col-xxl-6">
      <div className="card shadow-sm">
        <div className="card-body row p-5">{form}</div>
      </div>
    </div>
  );

  return container;
};

export default Login;
