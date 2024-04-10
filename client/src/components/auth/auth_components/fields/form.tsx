import MailIcon from '@icons/forms_icons/mail_icon.svg?react';
import VisibleIcon from '@icons/forms_icons/visibility_icon.svg?react';
import { Button } from '@material-tailwind/react';
import { Form } from 'formik';

import type { FormFieldProps } from '@/types/auth.types';
import { Utils } from '@/utils';

const { InputField } = Utils;

const FormField: React.FC<FormFieldProps> = ({
  handleSubmit, errors, touched, getFieldProps, isLogin, isSubmitting,
}): React.JSX.Element => (
  <Form
    noValidate
    onSubmit={handleSubmit}
    className="mx-auto mb-4 flex w-[500px] flex-col gap-4 rounded-b-lg bg-white px-12 py-10"
  >

    <InputField
      field="email"
      Icon={MailIcon}
      errors={errors}
      touched={touched}
      isSubmitting={isSubmitting}
      getFieldProps={getFieldProps}
    />

    <InputField
      field="password"
      Icon={VisibleIcon}
      errors={errors}
      touched={touched}
      isSubmitting={isSubmitting}
      getFieldProps={getFieldProps}
    />

    <Button
      type="submit"
      color="gray"
      loading={isSubmitting}
      className="relative left-1/4 w-1/2 rounded px-3 py-2 font-rubik text-lg font-bold tracking-wider transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-gray-400"
    >
      {isLogin ? 'Sign In' : 'Sign Up'}
    </Button>

  </Form>
);

export default FormField;
