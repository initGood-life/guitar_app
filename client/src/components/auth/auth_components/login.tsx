import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { useReactCookieHandler } from '@/custom/custom.hooks';
import { useAppDispatch } from '@/redux.hooks';
import { useHandleLoginMutation, useHandleRegisterMutation } from '@/store/api/auth.api';
import type { LoginToggle, SubmitValue } from '@/types/auth.types';

import FormField from './fields/form';
import OtherFields from './fields/other_fields';
import { submitForm, Validation } from './fields/submit.handler';

// TODO: add password protection uncover on icon click
// TODO: add functionality for check box to handle remember me

const Login: React.FC<LoginToggle> = ({ isLogin, setIsLogin }): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSetCookie } = useReactCookieHandler();
  const [handleLogin] = useHandleLoginMutation();
  const [handleRegister] = useHandleRegisterMutation();
  const handleAuth = () => setIsLogin(!isLogin);
  const onSubmitHandler = async ({ email, password }: SubmitValue) => submitForm({
    email,
    password,
    isLogin,
    navigate,
    handleSetCookie,
    handleRegister,
    handleLogin,
    dispatch,
    setIsLogin,
  });

  return (
    <div className="mb-10 justify-center rounded-t-lg p-3 text-gray-900">
      <div className="mb-6 rounded-t-lg bg-white p-3 text-center ">
        <h1
          className="pointer-events-none font-rubik text-4xl font-bold tracking-wider text-gray-900"
        >
          {isLogin ? 'Enter Your Account' : 'Join Shop Today'}
        </h1>
      </div>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Validation}
        onSubmit={onSubmitHandler}
      >
        {({
          errors, getFieldProps, touched, handleSubmit, isSubmitting,
        }) => (
          <FormField
            handleSubmit={handleSubmit}
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
            getFieldProps={getFieldProps}
            isLogin={isLogin}
          />

        )}

      </Formik>

      <div className="relative flex justify-between">
        <OtherFields isLogin={isLogin} handleAuth={handleAuth} />

      </div>
    </div>
  );
};

export default Login;

// user to check { "email": "vladvip8acc041022@gmail.com", "password":"jQts88"}
