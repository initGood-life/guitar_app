import {
  Card, CardBody, CardHeader, Typography,
} from '@material-tailwind/react';

import type { AuthStateWithUser } from '@/types/auth.types';

const Profile: React.FC<AuthStateWithUser> = ({ userData }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return new Date(dateString).toLocaleDateString('default', options).replace(',', '');
  };

  return (
    <div className="flex-1 p-4">
      <Card>
        <CardHeader color="gray" className="mt-5 bg-gray-700 py-4 text-left">
          <Typography
            variant="h5"
            color="white"
            className="mx-5 text-lg font-semibold text-white"
          >
            Profile Overview
          </Typography>
        </CardHeader>
        <CardBody className="bg-white">
          <Typography variant="h6" className="px-5 py-3 text-xl font-light text-gray-700">
            Welcome back,
            {' '}
            {userData?.user.firstname ?? 'John'}
            ! Here&apos;s info about your
            {' '}
            {userData?.user.role}
            {' '}
            profile:
          </Typography>
          <div className="px-5 py-2">

            <div className="flex items-center text-lg font-light text-gray-800">
              <span className="font-semibold text-gray-900">Full Name:</span>
              <span className="ml-2">
                {userData?.user.firstname ?? 'John'}
                {' '}
                {userData?.user.lastname ?? 'Doe'}
              </span>
            </div>

            <div className="mt-2 flex items-center text-lg font-light text-gray-800">
              <span className="font-semibold text-gray-900">Email:</span>
              <span className="ml-2">{userData?.user.email}</span>
            </div>

            <div className="mt-2 flex items-center text-lg font-light text-gray-800">
              <span className="font-semibold text-gray-900">Registered At:</span>
              <span className="ml-2">{userData ? formatDate(userData.user.createdAt) : 'Loading...'}</span>
            </div>

            <div className="mt-6 flex items-center text-lg font-light text-gray-800">
              <span className="text-xl font-bold text-gray-700">History of purchases:</span>
              <span className="ml-2">
                {/** //TODO: Display user purchase history with appropriate product info */}
                {userData?.user.history.map((product) => (
                  <div key={product} className="flex items-center text-lg font-light text-gray-800">
                    {formatDate(product)}
                    {' '}
                    -
                    {product}
                  </div>
                ))}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;
