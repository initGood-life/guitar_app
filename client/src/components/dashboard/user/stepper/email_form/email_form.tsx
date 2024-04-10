import { Button } from '@material-tailwind/react';
import { Form } from 'formik';

import type { EmailToUpdateProps } from '@/types/user.types';
import { Utils } from '@/utils';

const { InputField } = Utils;

export const EmailForm = ({
  activeStep, errors, touched, isSubmitting, handleSubmit, getFieldProps,
}: EmailToUpdateProps) => (
  <Form noValidate onSubmit={handleSubmit} className="flex h-[180px] w-full flex-col gap-6 rounded-lg bg-white p-6">
    {activeStep === 0 && (
      <>
        <InputField
          field="email"
          variant="static"
          errors={errors}
          touched={touched}
          isSubmitting={isSubmitting}
          getFieldProps={getFieldProps}
        />
        {(!!errors?.email ?? !touched?.email) ? (
          <p className="text-lg text-gray-900">
            Please confirm your current email.
          </p>
        ) : (
          <p className="text-base text-gray-900">
            Your email is successfully validated. Please enter your new email.
          </p>
        )}
      </>
    )}

    {activeStep === 1 && (
      <InputField
        field="newemail"
        hardcodedLabel="Your New Email"
        variant="static"
        type="email"
        errors={errors}
        touched={touched}
        isSubmitting={isSubmitting}
        getFieldProps={getFieldProps}
      />
    )}

    {activeStep === 2 && (
      <div className="text-center">
        <p className="text-start text-2xl font-light text-gray-900">
          Your email has been successfully changed!
          Do not forget to verify your new email address
          by clicking the link that was sent to your new email address.
        </p>
      </div>
    )}

    {activeStep !== 0 && activeStep !== 2 && (
      <Button
        type="submit"
        loading={isSubmitting}
        color="gray"
        className="relative left-1/4 w-1/2 rounded px-3 py-2 font-rubik text-lg font-extralight tracking-widest transition-all duration-300 ease-in-out hover:bg-gray-800"
      >
        Submit
      </Button>
    )}
  </Form>
);
