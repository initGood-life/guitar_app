import type { OtherFieldsProps } from '@/types/auth.types';

const OtherFields: React.FC<OtherFieldsProps> = ({ isLogin, handleAuth }) => (
  <>
    <div className="relative m-3 w-fit bg-blue-gray-300/40 p-2 text-white">
      <label htmlFor="#rememberMe" className="text-base">
        <input
          id="rememberMe"
          name="checkbox"
          className="mr-2 h-5 w-5 cursor-pointer rounded border border-gray-400 accent-light-blue-900"
        />
        Remember Me

      </label>
    </div>

    <div className="mt-6 text-right text-sm text-white">
      {isLogin ? 'Don`t have an account?' : 'Already have an account!'}
      <button type="button" onClick={handleAuth} className="ml-2 cursor-pointer font-medium text-indigo-600">
        {!isLogin ? 'Sign In' : 'Sign Up'}
      </button>
    </div>
  </>
);

export default OtherFields;
