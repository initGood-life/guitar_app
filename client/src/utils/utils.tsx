import {
  Input, Option,
  Select,
} from '@material-tailwind/react';
import type { ChangeEvent } from 'react';
import { createElement, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/redux.hooks';
import { setErrorState } from '@/store/features/error.handler';
import type {
  InputFieldProps,
  SelectFieldProps,
  WavesButtonProps,
} from '@/types/utils.types';
/**
 * Reusable button Component with link support
 */
const WavesButton: React.FC<WavesButtonProps> = ({
  label, link, isLinked = false, styled, children, ...rest
}) => {
  const buttonStyles = styled;
  const buttonContent = isLinked && link ? (
    <Link to={link} className={buttonStyles} {...rest}>{label ?? children}</Link>
  ) : (
    <button type="button" className={buttonStyles} {...rest}>{label}</button>
  );

  return buttonContent;
};

/**
 * Reusable component for rendering a Formik input field.
 *
 * Accepts various props for configuring the input, including the Formik
 * field metadata, input type, label, icon, styling, and error handling.
 *
 * Renders a Material Tailwind Input component with integrated Formik bindings.
 * Handles error state from Formik and Redux.
 */
const InputField: React.FC<InputFieldProps> = ({
  errors, touched, field, getFieldProps, Icon, isSubmitting, ...props
}) => {
  const dispatch = useAppDispatch();
  const { value, onChange, onBlur } = getFieldProps(field);
  const {
    size = 'lg',
    required = true,
    variant = 'outlined',
    className,
    hardcodedLabel,
    type = field,
    color = 'black',
    ...otherProps
  } = props;
  const inputText = field.replace(/\b\w/g, (val) => val.toUpperCase());
  const errorMessage = useAppSelector((state) => state.error);
  const isBackendError = errorMessage.field === field;
  const isError = errors?.[field] && touched?.[field];
  const label = `Enter ${hardcodedLabel ?? inputText}${required ? '*' : ''}`;
  const handleIcon = Icon && createElement(Icon, {
    className: (isError ?? isBackendError) ? 'fill-red-500' : 'fill-gray-900',
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (isBackendError) {
      dispatch(setErrorState({ error: undefined, field: '' }));
    }
  }, [onChange, isBackendError, dispatch]);

  const renderErrorMessage = (message?: string) => (
    <span className="pointer-events-none absolute left-3 top-10 max-w-[90%] truncate pt-[0.37rem] text-sm leading-[1.6] text-red-500">
      {message}
    </span>
  );

  return (
    <div className="relative mb-4">
      <Input
        size={size}
        variant={variant}
        crossOrigin="anonymous"
        type={type}
        label={label}
        aria-invalid={!!isError}
        error={isError ? true : isBackendError}
        icon={handleIcon}
        color={isError ? 'red' : color}
        value={value}
        name={field}
        placeholder={hardcodedLabel ?? inputText}
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={onBlur}
        min={type === 'number' ? 0 : undefined}
        {...otherProps}
        className={`${className} peer text-xl text-black invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-500`}
      />
      {isError && renderErrorMessage(errors?.[field])}
      {isBackendError && renderErrorMessage(errorMessage.error)}
    </div>
  );
};

/**
 * SelectField component renders a select input with options.
 * It handles errors and touched state for form validation.
 */
const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  field,
  touched,
  errors,
  value,
  setFieldValue,
  ...props
}) => {
  const isError = !!errors?.[field] && touched?.[field];
  const {
    variant,
    color = 'gray',
    className,
    sizes = 'lg',
  } = props;

  return (
    <Select
      variant={variant}
      label={label}
      error={isError}
      color={color}
      size={sizes}
      name={field}
      value={value}
      className={`${className} text-lg font-normal`}
      onChange={(e) => setFieldValue(field, e)}
      {...props}
    >
      {options?.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}

    </Select>
  );
};

export default {
  WavesButton,
  InputField,
  SelectField,
};
