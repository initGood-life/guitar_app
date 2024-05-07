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

const ProductCart = lazy(() => import('@components/product'));
const Auth = lazy(() => import('@components/auth'));
const Dashboard = lazy(() => import('@components/dashboard'));
const ShopGuitars = lazy(() => import('@components/shop'));

const {
  DASHBOARD, LOGIN, HOME, SHOP,
} = RouteName;

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

      <Route
        path="/product/cart"
        element={(
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <AuthGuard>
                <Header />
                <ProductCart />
              </AuthGuard>
            </ErrorBoundary>
          </Suspense>
        )}
      />

      <Route
        path={SHOP}
        element={(
          <>
            <Header />
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <ShopGuitars />
              </ErrorBoundary>
            </Suspense>
            <Footer />
          </>
        )}
      />

    </Routes>
  );
};
export default SetRoutes;
