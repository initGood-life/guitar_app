import CallIcon from '@icons/call_FILL0_wght400_GRAD0_opsz24.svg?react';
import ContactIcon from '@icons/contact_page_FILL0_wght400_GRAD0_opsz24.svg?react';
import EmailIcon from '@icons/mark_email_unread_FILL0_wght400_GRAD0_opsz24.svg?react';

export const WorkingHours = (): JSX.Element => (
  <>
    <div className="pointer-events-none mt-4 flex items-center">
      <p className="mr-2 w-32 font-roboto text-base text-blue-gray-200">
        Closed:
      </p>
      <span className="text-base font-extralight text-blue-gray-400">
        Monday, Sunday, Saturday
      </span>
    </div>
    <div className="pointer-events-none mt-2 flex items-center">
      <p className="mr-2 w-32 font-roboto text-base text-blue-gray-200">
        Tuesday:
      </p>
      <span className="text-base font-extralight text-blue-gray-400">
        13:00 &#8212; 18:00
      </span>
    </div>
    <div className="pointer-events-none mt-2 flex items-center">
      <p className="mr-2 w-32 font-roboto text-base text-blue-gray-200">
        Wednesday:
      </p>
      <span className="text-base font-extralight text-blue-gray-400">
        10:00 &#8212; 17:00
      </span>
    </div>
    <div className="pointer-events-none mt-2 flex items-center">
      <p className="mr-2 w-32 font-roboto text-base text-blue-gray-200">
        Thursday:
      </p>
      <span className="text-base font-extralight text-blue-gray-400">
        13:00 &#8212; 19:00
      </span>
    </div>
    <div className="pointer-events-none mt-2 flex items-center">
      <p className="mr-2 w-32 font-roboto text-base text-blue-gray-200">
        Friday:
      </p>
      <span className="text-base font-extralight text-blue-gray-400">
        11:00 &#8212; 16:00
      </span>
    </div>
  </>
);

export const ContactInfo = (): JSX.Element => (
  <div className="pointer-events-none mt-4 flex flex-col">
    <div className="flex items-center gap-x-2">
      <ContactIcon className="h-12 w-12 fill-blue-gray-200" />
      <div className="flex flex-col">
        <p className="font-roboto text-base text-blue-gray-200">Address:</p>
        <p className="text-base font-extralight text-blue-gray-400">
          Some street 455/1, 8134 CV Kyiv Ukr.
        </p>
      </div>
    </div>
    <div className="mt-4 flex items-center gap-x-2">
      <CallIcon className="h-12 w-12 fill-blue-gray-200" />
      <div className="flex flex-col">
        <p className="font-roboto text-base text-blue-gray-200">Phone:</p>
        <p className="text-base font-extralight text-blue-gray-400">
          +380953478879
        </p>
      </div>
    </div>
    <div className="mt-4 flex items-center gap-x-2">
      <EmailIcon className="h-12 w-12 fill-blue-gray-200" />
      <div className="flex flex-col">
        <p className="font-roboto text-base text-blue-gray-200">Email:</p>
        <p className="text-base font-extralight text-blue-gray-400">
          wavesvip8acc@email.com
        </p>
      </div>
    </div>
  </div>
);
