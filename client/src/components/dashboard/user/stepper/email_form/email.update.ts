import * as Yup from 'yup';

import { setErrorState } from '@/store/features/error.handler';
import type { EmailToSubmit } from '@/types/user.types';
import { showSwal } from '@/utils';
import isSerializedError from '@/utils/serialized';

export const submitUpdateEmail = async ({
  token, userEmail, userId, dispatch, updateEmail,
}: EmailToSubmit): Promise<void> => {
  const { newemail } = userEmail;

  if (!token) {
    showSwal({
      title: 'Error!',
      text: 'Authentication token is missing. Please log in again.',
      icon: 'error',
    });
    return;
  }

  try {
    await updateEmail({
      token,
      userEmail: { newemail },
      userId,
    });
  } catch (error) {
    if (isSerializedError(error)) {
      dispatch(setErrorState({
        error: error.data.message,
        field: error.data.field ?? '',
      }));
    }
  }
};

export const EmailValidate = ({ userEmail }: { userEmail: string | undefined }) => Yup.object({
  email: Yup
    .string()
    .email('Invalid email address')
    .test('match', 'Input must match current email', (value) => value === userEmail)
    .required('Email is required'),
  newemail: Yup
    .string()
    .email('Invalid email address')
    .test('match', 'New email must not match current email', (value) => value !== userEmail)
    .required('New email is required'),
});
