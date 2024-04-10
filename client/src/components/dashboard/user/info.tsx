import {
  Dialog, DialogBody, DialogHeader, Typography,
} from '@material-tailwind/react';
import { Formik } from 'formik';
import { useState } from 'react';

import { useReactCookieHandler } from '@/custom/custom.hooks';
import { useAppDispatch } from '@/redux.hooks';
import { useUpdateUserMutation } from '@/store/api/user.api';
import type { AuthStateWithUser } from '@/types/auth.types';
import type { IUpdateFormFields, UserUpdateData } from '@/types/user.types';

import { UserFieldToUpdate } from './form/form_to_update';
import { userUpdate, ValidateInfo } from './form/user.update';
import { EmailStepper } from './stepper/email_stepper';
import ChangeEmail from './stepper/show_change_email';

const UserInfo: React.FC<AuthStateWithUser> = ({ userData }) => {
  const [stepperActive, setStepperActive] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserMutation();
  const { cookies } = useReactCookieHandler();
  const submitData = async ({
    firstname, lastname, phone, gender,
  }: UserUpdateData) => userUpdate({
    dispatch,
    updateUser,
    userId: userData?.user._id,
    token: cookies['x-access-token'],
    userData: {
      firstname,
      lastname,
      phone,
      gender,
    },
  });

  const initialValues = {
    firstname: userData?.user.firstname ?? '',
    lastname: userData?.user.lastname ?? '',
    gender: userData?.user.gender ?? '',
    phone: userData?.user.phone ?? '',
  };

  const handleOpen = () => setStepperActive(!stepperActive);
  const dialogHeaderText = ['Confirm Current Email', 'Update Email', 'Confirm New Email'];

  const showStepper = () => (
    <Dialog open={stepperActive} handler={handleOpen} className="w-fit">
      <DialogHeader className="rounded-t-md border-b border-gray-700 bg-gray-900">
        <Typography
          as="h2"
          color="gray"
          className="font-rubik text-2xl font-bold tracking-wider text-white"
        >
          {dialogHeaderText[activeStep]}
        </Typography>
      </DialogHeader>
      <DialogBody
        color="gray"
        className="flex w-full flex-col rounded-b-md bg-gray-900 px-5 pt-5"
      >
        {stepperActive && (
          <EmailStepper
            userId={userData?.user._id}
            userEmail={userData?.user.email}
            activeStep={activeStep}
            closeStepper={() => setStepperActive(false)}
            setActiveStep={setActiveStep}
          />
        )}
      </DialogBody>
    </Dialog>
  );

  return (
    <>
      <div className="m-10 flex h-[650px] w-[650px] items-center justify-center border border-gray-300 shadow-md shadow-gray-400">

        <ChangeEmail
          email={userData?.user.email}
          setStepperActive={setStepperActive}
        />

        {showStepper()}
      </div>
      <div className="flex flex-1 flex-col items-end justify-start p-10">

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={ValidateInfo}
          onSubmit={submitData}
        >
          {(formik) => {
            const userFieldProps: IUpdateFormFields = {
              errors: formik.errors,
              touched: formik.touched,
              isSubmitting: formik.isSubmitting,
              getFieldProps: formik.getFieldProps,
              handleSubmit: formik.handleSubmit,
              setFieldValue: formik.setFieldValue,
            };

            return <UserFieldToUpdate {...userFieldProps} />;
          }}

        </Formik>
      </div>
    </>
  );
};

export default UserInfo;
