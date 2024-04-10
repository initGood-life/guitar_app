import ErrorIcon from '@icons/forms_icons/error_icon.svg?react';
import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

import { showSwal } from './utils';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (errorInfo.componentStack) {
      showSwal({
        title: error.message,
        text: `Error: ${errorInfo.componentStack.length > 400 ? `${errorInfo.componentStack.slice(0, 300)} ...` : ''}`,
        icon: 'error',
      });
    }
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-white">
          <ErrorIcon className="mx-auto mb-6 h-24 w-24 fill-red-500" />
          <h1 className="mb-4 text-5xl font-bold text-red-600">
            Oops! App is now broken.
          </h1>
          <p className="text-2xl text-gray-700">
            There&apos;s trouble to compile or render this app.
          </p>
          <p className="text-base text-gray-500">
            Please send report about the error to support, and we will fix it soon.
          </p>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
