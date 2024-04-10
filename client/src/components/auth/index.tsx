import { useState } from 'react';

import Login from './auth_components/login';
import Welcome from './auth_components/welcome_page';

const Auth = (): React.JSX.Element => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="grid h-screen w-screen place-items-center bg-black_guitar bg-cover bg-no-repeat">
      {isLogin ? (
        <div
          className="box-content h-[412px] rounded-lg border-0.5 border-gray-800 bg-[#1a1a17] p-12 pb-20"
        >
          <Login
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        </div>
      ) : (
        <div
          className="flex h-[529.6px] rounded-lg border-0.5 border-gray-800 bg-[#1a1a17] p-8"
        >
          <Welcome isLogin={isLogin} />
          <div className="my-2 mr-6 h-auto border-r border-gray-600" />
          <Login
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        </div>
      )}

    </div>
  );
};

export default Auth;
