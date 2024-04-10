import * as Yup from 'yup';

import { setErrorState } from '@/store/features/error.handler';
import type { UpdateUserArgs } from '@/types/user.types';
import { showSwal } from '@/utils';
import isSerializedError from '@/utils/serialized';

export const userUpdate = async ({
  dispatch, userId, token, userData, updateUser,
}: UpdateUserArgs): Promise<void> => {
  if (!token) {
    showSwal({
      title: 'Error!',
      text: 'Authentication token is missing. Please log in again.',
      icon: 'error',
    });
    return;
  }

  try {
    showSwal({
      title: 'Success!',
      text: 'Profile updated successfully',
      icon: 'success',
    });

    await updateUser({
      userId,
      userData: {
        firstname: userData.firstname,
        lastname: userData.lastname,
        phone: userData.phone,
        gender: userData.gender,
      },
      token,
    }).unwrap();
  } catch (error) {
    if (isSerializedError(error)) {
      dispatch(setErrorState({
        error: error.data.message,
        field: error.data.field ?? '',
      }));
    }
  }
};

export const ValidateInfo = Yup.object({
  firstname: Yup.string()
    .trim()
    .required('First Name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .matches(/^[\p{L}\p{M}-]+$/u, 'First name cannot contain numbers or special characters'),
  lastname: Yup.string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .required('Last Name is required')
    .matches(/^[\p{L}\p{M}-]+$/u, 'Last name cannot contain numbers or special characters'),
  gender: Yup.string().notRequired(),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number can only contain numbers')
    .notRequired(),
});
