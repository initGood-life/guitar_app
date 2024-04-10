import { Utils } from '@/utils';

const { WavesButton } = Utils;

const Welcome = ({ isLogin }: { isLogin: boolean }): React.JSX.Element => (
  <div className="mr-6 grid place-items-center text-gray-900">
    <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
      <h1 className="pointer-events-none mb-4 text-3xl font-bold">Welcome to Waves</h1>
      <p className="pointer-events-none mb-6 text-lg">
        Sign up for instant access to all benefits
      </p>
      <ul className="pointer-events-none mb-6">
        <li className="mb-4">
          <span className="mr-2 text-lg font-bold text-green-500">✓</span>
          Exclusive deals on selected items
        </li>
        <li className="mb-4">
          <span className="mr-2 text-lg font-bold text-green-500">✓</span>
          Priority customer support
        </li>
        <li className="mb-4">
          <span className="mr-2 text-lg font-bold text-green-500">✓</span>
          Early access to pre-owned items
        </li>
      </ul>
      <WavesButton
        label={isLogin ? 'Sign Up' : 'Log In'}
        styled="w-full rounded bg-[#1a1a17] py-3 font-rubik font-bold tracking-widest text-white hover:bg-gray-800"
      />
    </div>
  </div>
);

export default Welcome;
