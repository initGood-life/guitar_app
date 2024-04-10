import ErrorIcon from '@icons/forms_icons/error_icon.svg?react';

const AuthStateError = (): React.JSX.Element => (
  <div className="text-center">
    <ErrorIcon className="mx-auto mb-6 h-24 w-24 fill-red-500" />
    <h1 className="mb-4 text-5xl font-bold text-red-600">
      Oops! Something went wrong.
    </h1>
    <p className="text-2xl text-gray-700">
      We&apos;re having trouble connecting right now.
    </p>
    <p className="text-base text-gray-500">
      Please check your internet connection and try again later.
    </p>
  </div>
);

export default AuthStateError;
