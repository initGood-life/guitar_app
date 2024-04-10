import EmailIcon from '@icons/dashboard_icons/mail.svg?react';
import { Button } from '@material-tailwind/react';

const ChangeEmail = (
  { email, setStepperActive }: {
    email: string | undefined;
    setStepperActive: (value: boolean)=> void;
  },
): React.JSX.Element => (
  <div className="flex h-fit w-fit flex-col items-center justify-center gap-8 rounded-md bg-gray-900 p-5 py-6">
    <h1 className="cursor-default text-2xl font-bold text-white">Manage Your Account Email</h1>
    <div className="flex w-fit cursor-default gap-3 rounded-sm bg-white p-1 px-3 text-2xl">
      <EmailIcon className="h-10 w-10 fill-gray-900" />
      <span className="font-bold text-gray-900">{email}</span>
    </div>
    <Button
      type="button"
      color="white"
      onClick={() => setStepperActive(true)}
      className="rounded px-4 py-2 font-rubik text-xl font-bold tracking-wider text-gray-800 transition-all duration-300 ease-in-out hover:bg-gray-400"
    >
      Change Email
    </Button>
  </div>
);

export default ChangeEmail;
