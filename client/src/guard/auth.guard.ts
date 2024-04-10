import React, {
  Children,
  cloneElement, isValidElement, useCallback, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/redux.hooks';
import type { AuthStateWithUser, IAuthGuardProps } from '@/types/auth.types';
import { RouteName, showSwal } from '@/utils';

type ChildProps = React.Attributes & { userData: AuthStateWithUser };

const { DASHBOARD, LOGIN } = RouteName;

const AuthGuard: React.FC<IAuthGuardProps> = ({ children, route, ...rest }) => {
  const navigate = useNavigate();

  const userData = useAppSelector((state) => state.userInfo);
  const userAuth = Object.values((userData)).length !== 0;

  const checkAuthState = useCallback(() => {
    if (!userAuth && route === DASHBOARD) {
      navigate(`/${LOGIN}`, { replace: true });
      showSwal({
        title: 'Unauthorized',
        text: 'You must be authorized to view your dashboard',
        icon: 'error',
      });
    }
    if (userAuth && route === LOGIN) {
      navigate(`/${DASHBOARD}`, { replace: true });
      showSwal({
        title: 'Already Logged In',
        text: 'You are already logged in',
        icon: 'info',
      });
    }
  }, [navigate, route, userAuth]);

  useEffect(() => { checkAuthState(); }, [checkAuthState]);

  if (!children) return null;

  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { userData, ...rest } as ChildProps);
    }
    return child;
  });
};

export default AuthGuard;
