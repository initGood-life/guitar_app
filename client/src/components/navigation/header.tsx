import LogoutIcon from '@icons/logout_FILL0_wght200_GRAD200_opsz48.svg?react';
import { Navbar, Typography } from '@material-tailwind/react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useReactCookieHandler, useTrackOnScroll } from '@/custom/custom.hooks';
import { useAppDispatch, useAppSelector } from '@/redux.hooks';
import { useHandleLogoutMutation } from '@/store/api/auth.api';
import { selectedItems } from '@/store/features/item.counter.slice';
import { resetUser } from '@/store/features/user.info';
import { RouteName, showSwal } from '@/utils';

const { LOGIN, HOME, DASHBOARD } = RouteName;

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cookies } = useReactCookieHandler();
  const trackOnScroll = useTrackOnScroll();
  const [handleLogout] = useHandleLogoutMutation();
  const itemsInCart = useAppSelector(selectedItems)
    .map((item) => item.amountItems)
    .reduce((a, b) => a + b, 0);
  const isEmptyCookie = JSON.stringify(cookies) === '{}';

  const logoutHandler = async () => {
    if (!isEmptyCookie) {
      await handleLogout();
      showSwal({
        title: 'Logout Successful',
        text: 'You have been logged out',
        icon: 'success',
      });
      navigate(`/${LOGIN}`);
    }
    dispatch(resetUser());
  };

  useEffect(() => {
    if (isEmptyCookie || !cookies['x-access-token']) {
      dispatch(resetUser());
      navigate(`/${LOGIN}`);
    }
  }, [dispatch, isEmptyCookie, cookies, navigate]);

  return (
    <Navbar
      blurred={false}
      color="blue-gray"
      fullWidth
      className={`fixed ${!trackOnScroll ? '-z-50 opacity-0 transition-opacity delay-100 duration-300 ease-in-out' : 'z-20 opacity-100 transition-opacity delay-75 duration-300 ease-in-out'} top-0 mx-auto h-fit max-w-full border-none bg-gray-900 px-4 py-2 shadow-md shadow-gray-800/20 backdrop-blur-md`}

    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          as="a"
          href={HOME}
          className="animated-gradient cursor-pointer rounded-full p-6 py-3 font-monoton text-5xl font-extralight italic text-transparent hover:text-transparent"
        >
          WAVES
        </Typography>

        <div className="flex items-center gap-12">
          {/* // TODO add icon for each menu item, later add search bar */}
          <Link
            to={HOME}
            aria-label="Home"
            className="cursor-pointer py-1 font-rubik text-2xl font-extralight tracking-wide text-blue-gray-200"
          >
            HOME
          </Link>
          <Link
            to="/shop"
            aria-label="Shop"
            className="cursor-pointer py-1 font-rubik text-2xl font-extralight tracking-wide text-blue-gray-200"
          >
            SHOP
          </Link>
          <div className="p-1">
            <Link
              to="/product/cart"
              aria-label="My Cart"
              className="mr-2 cursor-pointer py-1 font-rubik text-2xl font-extralight tracking-wide text-blue-gray-200"
            >
              MY CART
            </Link>
            <span className="absolute rounded-full bg-orange-400/95 px-1.5 py-0.5 text-xs font-bold text-gray-900">
              {itemsInCart}
            </span>
          </div>
          <Link
            to={`/${DASHBOARD}`}
            aria-label="My Account"
            className="cursor-pointer py-1 font-rubik text-2xl font-extralight tracking-wide text-blue-gray-200"
          >
            ACCOUNT
          </Link>
        </div>

        {isEmptyCookie ? (
          <div className="flex items-center gap-x-3">
            <Link
              to={`/${LOGIN}`}
              aria-label="My Account"
              className="cursor-pointer py-1 font-rubik text-2xl font-medium uppercase tracking-wider text-blue-gray-200"
            >
              Sign In
            </Link>

          </div>
        ) : (
          <div className="flex items-center gap-x-3">
            <button
              type="button"
              onClick={logoutHandler}
              className="flex cursor-pointer items-center justify-center bg-gray-600 p-2 py-1 transition duration-150 ease-in-out hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:bg-gray-800"
            >
              <span className="mr-2 font-rubik text-3xl font-extralight tracking-wide text-gray-900">Log Out</span>
              <LogoutIcon className="size-10 fill-gray-900 transition-all duration-300 ease-in-out hover:fill-white" />
            </button>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
