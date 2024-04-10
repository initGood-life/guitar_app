import * as Yup from 'yup';

import { setErrorState } from '@/store/features/error.handler';
import type { SubmitFormArgs } from '@/types/auth.types';
import { showSwal } from '@/utils';
import isSerializedError from '@/utils/serialized';

export const submitForm = async ({
  email, password, isLogin, navigate,
  handleSetCookie, handleRegister,
  handleLogin, dispatch, setIsLogin,
}: SubmitFormArgs): Promise<void> => {
  try {
    if (isLogin) {
      const response = await handleLogin({ email, password }).unwrap();
      const { token } = response;

      if (token) {
        handleSetCookie({ token });
        navigate('/', { replace: true });
        showSwal({
          title: 'Login Successful',
          text: 'You have successfully logged in!',
          icon: 'success',
        });
      }
    } else {
      await handleRegister({ email, password }).unwrap();
      showSwal({
        title: 'Registration Successful',
        text: 'You have successfully registered!',
        icon: 'success',
      });
      setIsLogin(true);
    }
    dispatch(setErrorState({
      error: undefined,
      field: '',
    }));
  } catch (error) {
    if (isSerializedError(error)) {
      dispatch(setErrorState({
        error: error.data.message,
        field: error.data.field ?? '',
      }));
    }
  }
};

export const Validation = Yup.object({
  email: Yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});
