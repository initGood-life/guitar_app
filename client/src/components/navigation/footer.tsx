import { Typography } from '@material-tailwind/react';

import { ContactInfo, WorkingHours } from './nav_parts/footer_parts';

const Footer = (): JSX.Element => (
  <footer className="w-full flex-row flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-black bg-gray-900 py-6 text-center md:justify-between">
    <div className="relative pb-6">
      <Typography
        as="a"
        href="/"
        className="animated-gradient cursor-pointer font-monoton text-4xl font-extralight italic text-transparent hover:text-transparent"
      >
        WAVES
      </Typography>
    </div>

    <hr className="relative left-1/2 top-0 w-96 -translate-x-1/2 bg-gray-400/90" />

    <ul className="mt-6 flex items-start justify-center gap-x-14 text-left">
      <li className="flex flex-col items-start">
        <div className="font-oswald text-xl font-normal tracking-wider text-white">
          About Us
        </div>
        <div className="pointer-events-none mt-4">
          <p className="mb-4 w-56 border-b border-blue-gray-200 pb-5 font-rubik text-sm font-extralight text-blue-gray-200">
            The Waves is an official dealer
            <br />
            for Ibanez, Fender, Suhr,
            <br />
            Roland, Boss, Martin and a
            <br />
            lot of other brands.
          </p>
          <p className="w-60 text-sm font-extralight text-gray-500">
            Chamber of Commerce: 64589748.
          </p>
        </div>
      </li>
      <li>
        <div className="font-oswald text-xl font-normal tracking-wider text-white">
          Terms & Conditions
        </div>
        <div className="container pointer-events-none mt-4 w-56 items-center gap-x-2">
          <p className="font-rubik text-sm font-thin text-blue-gray-200">
            “This application was created for training purposes only and does
            not represent any real company or products.”
          </p>
          <p className="mt-2 text-xs font-extralight text-gray-600">
            &copy;Copyright 2023 Waves Limited. All rights reserved.
          </p>
        </div>

      </li>
      <li>
        <div className="font-oswald text-xl font-normal tracking-wider text-white">
          Working hours
          <WorkingHours />
        </div>
      </li>
      <li>
        <div className="font-oswald text-xl font-normal tracking-wider text-white">
          Contact Info
          <ContactInfo />
        </div>
      </li>
    </ul>
  </footer>
);

export default Footer;
