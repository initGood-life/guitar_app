import type { FC } from 'react';
import {
  lazy,
  Suspense,
  useEffect, useState,
} from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from '@/error_boundary';
import type { AuthStateWithUser } from '@/types/auth.types';
import { Loader } from '@/utils';

import AddProduct from './admin/admin_products/add_product_data/add_product_form';
import EditProduct from './admin/admin_products/edit_products/form/edit_form_products';
import EditImages from './admin/admin_products/edit_products/images/edit_images';
import type { LinksToRender } from './links/link_data';
import { AdminLinks, UserLinksList } from './links/link_data';
import UserLinks from './links/links';
import UserInfo from './user/info';
import Profile from './user/profile';

const AdminProducts = lazy(() => import('./admin/admin_products/main'));

const Dashboard: FC<AuthStateWithUser> = ({ userData }) => {
  const [links, setLinks] = useState<LinksToRender | undefined>(undefined);

  useEffect(() => {
    if (userData?.user) {
      const linksToRender = userData.user.role === 'admin'
        ? AdminLinks
        : UserLinksList;

      setLinks(linksToRender);
    }
  }, [userData]);

  if (!links) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-[88px] flex h-fit bg-gray-100 p-1">
      <div className="mr-4 w-72 border-r-1 border-gray-900/5 bg-white p-4 shadow-xl  shadow-gray-900">
        <div className="cursor-default p-4 text-2xl font-bold text-gray-800">My Dashboard</div>
        <nav className="mt-4 border-t-1 border-gray-400">
          {UserLinks(links)}

        </nav>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Profile userData={userData} />
        }
        />
      </Routes>

      <Routes>
        <Route
          path="user/user_info"
          element={
            <UserInfo userData={userData} />
        }
        />
      </Routes>

      <Routes>
        <Route
          path="admin/prod_images/:id"
          element={
            <EditImages />
        }
        />
      </Routes>

      <Routes>
        <Route
          path="admin/add_product"
          element={(
            <div className="flex h-fit w-[1250px] place-items-center justify-center p-10">
              <AddProduct />
            </div>
          )}
        />
      </Routes>

      <Routes>
        <Route
          path="admin/edit_products/:id"
          element={(
            <div className="flex h-fit w-[1250px] place-items-center justify-center p-10">
              <EditProduct />
            </div>
          )}
        />
      </Routes>

      <Routes>
        <Route
          path="admin/products"
          element={(
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <AdminProducts userData={userData} />
              </ErrorBoundary>
            </Suspense>
          )}
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
