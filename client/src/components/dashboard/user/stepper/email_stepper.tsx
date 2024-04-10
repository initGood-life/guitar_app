import { Formik } from 'formik';
import { useState } from 'react';

import { useReactCookieHandler } from '@/custom/custom.hooks';
import { useAppDispatch } from '@/redux.hooks';
import { useUpdateEmailMutation } from '@/store/api/user.api';
import type { StepperFormValues } from '@/types/user.types';
import { showSwal } from '@/utils';

import { EmailValidate, submitUpdateEmail } from './email_form/email.update';
import { EmailForm } from './email_form/email_form';
import { StepList } from './stepper_provider/stepper';

export const EmailStepper: React.FC<StepperFormValues> = (
  {
    activeStep, userEmail, userId, closeStepper, setActiveStep,
  },
) => {
  const dispatch = useAppDispatch();
  const [emailUpdateSuccess, setEmailUpdateSuccess] = useState(false);
  const [updateEmail] = useUpdateEmailMutation();
  const { cookies } = useReactCookieHandler();
  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const token = cookies['x-access-token'];
  const submitHandler = async ({ newemail }: { newemail: string; }) => {
    try {
      await submitUpdateEmail({
        token,
        userId,
        userEmail: { newemail },
        dispatch,
        updateEmail,
      });

      setTimeout(() => {
        setEmailUpdateSuccess(true);
        handleNext();
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        showSwal({
          title: 'Error!',
          text: error.message,
          icon: 'error',
        });
      }
      setEmailUpdateSuccess(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', newemail: '' }}
      validationSchema={EmailValidate({ userEmail })}
      onSubmit={submitHandler}
    >
      {({
        errors, touched, isSubmitting, handleSubmit, getFieldProps,
      }) => (
        <>
          <EmailForm
            activeStep={activeStep}
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            getFieldProps={getFieldProps}
          />

          <StepList
            activeStep={activeStep}
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
            emailIsUpdated={emailUpdateSuccess}
            closeStepper={closeStepper}
            handleBack={handleBack}
            handleNext={handleNext}
            setActiveStep={setActiveStep}
          />
        </>
      )}
    </Formik>
  );
};
