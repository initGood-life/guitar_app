import Home from '@components/home';
import Footer from '@components/navigation/footer';
import Header from '@components/navigation/header';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthStateError, Loader, RouteName } from '@/utils';

import { useAuthStateCheck } from './custom/custom.hooks';
import ErrorBoundary from './error_boundary';
import AuthGuard from './guard/auth.guard';
import { useAppDispatch } from './redux.hooks';
import { setUserInfo } from './store/features/user.info';

const Auth = lazy(() => import('@components/auth'));
const Dashboard = lazy(() => import('@components/dashboard'));

const { DASHBOARD, LOGIN, HOME } = RouteName;

const SetRoutes = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { authState, isLoading, isError } = useAuthStateCheck();

  useEffect(() => {
    if (authState) {
      dispatch(setUserInfo(authState.user));
    }
  }, [dispatch, authState]);

  if (isLoading) {
    return (
      <div className="grid h-screen place-items-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid h-screen place-items-center bg-gray-100">
        <AuthStateError />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path={HOME}
        element={(
          <>
            <Header />
            <Home />
            <Footer />
          </>
        )}
      />

      <Route
        path={`${DASHBOARD}/*`}
        element={(
          <>
            <Header />
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <AuthGuard route={DASHBOARD}>
                  <Dashboard />
                </AuthGuard>
              </ErrorBoundary>
            </Suspense>
            <Footer />
          </>
        )}
      />

      <Route
        path={LOGIN}
        element={(
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <AuthGuard route={LOGIN}>
                <Auth />
              </AuthGuard>
            </ErrorBoundary>
          </Suspense>
        )}
      />

    </Routes>
  );
};
export default SetRoutes;

// npm run dev -- --host

// user: 1. vladvip8acc041022@gmail.com jQts88
// user: 2. darknamexx@gmail.com apisF45