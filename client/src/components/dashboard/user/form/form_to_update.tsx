import { Button } from '@material-tailwind/react';
import { Form } from 'formik';

import type { IUpdateFormFields } from '@/types/user.types';
import { Utils } from '@/utils';

const { InputField, SelectField } = Utils;

export const UserFieldToUpdate: React.FC<IUpdateFormFields> = ({
  handleSubmit, getFieldProps, setFieldValue, errors, touched, isSubmitting,
}) => (
  <div className="mr-16 flex flex-col gap-10 rounded-lg bg-gray-900 p-5">
    <h1 className="font-roboto text-3xl font-bold tracking-wider text-gray-100">Account Info</h1>
    <Form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-96 flex-col gap-6 rounded-lg border-1 border-gray-400 bg-white p-8"
    >
      <InputField
        field="firstname"
        type="text"
        variant="static"
        color="gray"
        errors={errors}
        touched={touched}
        isSubmitting={isSubmitting}
        getFieldProps={getFieldProps}
      />

      <InputField
        field="lastname"
        type="text"
        variant="static"
        color="gray"
        errors={errors}
        touched={touched}
        isSubmitting={isSubmitting}
        getFieldProps={getFieldProps}
      />

      <InputField
        field="phone"
        type="tel"
        variant="static"
        color="gray"
        required={false}
        errors={errors}
        touched={touched}
        isSubmitting={isSubmitting}
        getFieldProps={getFieldProps}
      />

      <div className="w-1/2">
        <SelectField
          label="Gender"
          field="gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]}
          value={getFieldProps('gender').value}
          setFieldValue={setFieldValue}
        />
      </div>

      <Button
        type="submit"
        loading={isSubmitting}
        className="rounded bg-gray-900 px-4 py-2 font-rubik text-lg font-medium tracking-wider text-white transition-all duration-200 ease-in hover:bg-gray-800 focus:outline-none"
      >
        Submit Changes
      </Button>

    </Form>
  </div>
);
