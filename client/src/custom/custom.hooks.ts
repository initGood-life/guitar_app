import type { RefObject } from 'react';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useCookies } from 'react-cookie';

import { useLazyUserAuthStateQuery } from '@/store/api/auth.api';
import type { AuthState } from '@/types/auth.types';
import type { CookieSetProps, ReactCookieHandler } from '@/types/utils.types';

/**
 * Custom hook to track the previous value of a state or prop.
 *
 * @template T The type of the tracked value.
 * @param {T} value Current value to track, becomes "previous" on next render.
 * @param {T} defaultParam Initial value returned on the first render.
 * @returns {T | undefined} Previous value of 'value' from the last render, or
 * 'defaultParam' on the first render. If 'value' is unchanged, it returns 'value'.
 */

export function usePrevious<T>(value: T, defaultParam: T): T | undefined {
  const ref = useRef<T>(defaultParam);

  useEffect(() => { ref.current = value; }, [value]);

  return ref.current;
}

/**
 * Custom hook for handling tokens and cookie state based on react-cookie. It provides
 * a set of functions to manage cookies related to authentication tokens.
 *
 * @returns {ReactCookieHandler}
 * - cookies: The current state of the cookies, which includes the 'x-access-token' if present.
 * - handleSetCookie: A function that sets the 'x-access-token'
 * cookie with a given token and options.
 *   It sets the cookie to expire after 1 day by default,
 *  but this can be overridden with custom options.
 * - handleRemoveCookie: A function that removes the 'x-access-token' cookie from the browser.
 */

export function useReactCookieHandler(): ReactCookieHandler {
  const [cookies, setCookie, removeCookie] = useCookies(['x-access-token']);
  // TODO manage state when user token expired
  const handleSetCookie = ({ token, options = {} }: CookieSetProps) => {
    setCookie('x-access-token', token, {
      path: '/',
      sameSite: 'lax',
      expires: new Date(Date.now() + 86400000), // expires after 1 day
      ...options,
    });
  };

  const handleRemoveCookie = useCallback(() => {
    removeCookie('x-access-token', { path: '/' });
  }, [removeCookie]);

  return { cookies, handleSetCookie, handleRemoveCookie };
}

/**
 * Custom hook for retrieving the authentication state data of a user when a token is present.
 * It triggers an authentication state query on component mount and whenever the token changes.
 *
 * @returns An object containing:
 * - authState: The current user authentication state,
 *  which provides the user object if authenticated.
 * - isLoading: A boolean indicating if the query is
 *  currently loading for the first time, meaning no data is available yet.
 * - isError: A boolean indicating if the query is currently in an "error" state.
 * - isSuccess: A boolean indicating if the query has finished successfully.
 *
 * The hook also manages the authentication
 * state by resetting it and removing the cookie if an error occurs
 * during the authentication state query, or if the token is not present.
 */

export function useAuthStateCheck() {
  const { cookies, handleRemoveCookie } = useReactCookieHandler();
  const [authState, setAuthState] = useState<AuthState>(null);
  const [trigger, {
    data, isLoading, isError, isSuccess,
  }] = useLazyUserAuthStateQuery();
  const token = cookies['x-access-token'];

  useEffect(() => {
    const checkAuthState = async () => {
      if (typeof token === 'string' && token) {
        try {
          await trigger({ token });
        } catch (err) {
          // Only reset auth state and remove cookie if an error occurs
          setAuthState(null);
          handleRemoveCookie();
        }
      } else {
        // If there's no token, ensure auth state is null and remove the cookie
        setAuthState(null);
        handleRemoveCookie();
      }
    };
    // Call checkAuthState only if token is available and isError is false
    if (token && !isError) {
      void checkAuthState();
    }
  }, [isError, trigger, token, handleRemoveCookie]);

  useEffect(() => {
    if (data && data !== authState) {
      setAuthState(data);
    }
  }, [data, authState]);

  return {
    authState, isLoading, isError, isSuccess,
  };
}

/**
 * Custom hook to track scrolling for managing header visibility
 *
 * @returns {boolean}
 * - trackOnScroll: Boolean state that track user scroll position
 */

export function useTrackOnScroll(): boolean {
  const [trackOnScroll, setTrackScroll] = useState<boolean>(true);
  const [scrollUpTimeout, setScrollUpTimeout] = useState <NodeJS.Timeout | null>(null);

  useEffect(() => {
    let prevY = window.scrollY || document.documentElement.scrollTop;

    const handleScroll = () => {
      const currentY = document.documentElement.scrollTop;
      const isScrollingUp = currentY < prevY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // Check if bottom of page is reached
      const isAtBottom = currentY + windowHeight >= documentHeight - 1;

      if (scrollUpTimeout) {
        clearTimeout(scrollUpTimeout);
        setScrollUpTimeout(null);
      }

      if (isScrollingUp || isAtBottom) {
        // Set a timeout to delay setting trackOnScroll to true
        const timeoutId = setTimeout(() => { setTrackScroll(true); }, 200);
        setScrollUpTimeout(timeoutId);
      } else if (!isScrollingUp || !isAtBottom) {
        setTrackScroll(false);
      }

      prevY = currentY > 0 ? currentY : 0;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollUpTimeout) {
        clearTimeout(scrollUpTimeout);
      }
    };
  }, [scrollUpTimeout]);

  return trackOnScroll;
}

/**
 * Custom hook to track outside click for closing modal
 * @param target
 * @param callback
 * @param eventType
 */

export function useOuterEventHandler(
  target: RefObject<HTMLElement>,
  callback: ()=> void,
  eventType: 'click' | 'touchstart',
): void {
  useEffect(() => {
    const handleOutsideEvent = (event: Event) => {
      if (target.current && !target.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener(eventType, handleOutsideEvent as EventListener);
    return () => {
      document.removeEventListener(eventType, handleOutsideEvent as EventListener);
    };
  }, [target, callback, eventType]);
}

/**
* A custom hook that provides a debounced version of a callback function.
*
* @param callback - The callback function to be debounced.
* @param delay - The delay in milliseconds before the callback is executed.
* @returns A debounced version of the callback function.
*/

export function useDebounce(
  callback: (
    ...args: string[])=> void,
  delay: number,
) {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  return (...args: string[]) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
