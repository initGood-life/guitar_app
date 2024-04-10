import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

import type { LinksToRender } from './link_data';

const UserLinks = ({ links }: LinksToRender) => (
  links.map((link) => (
    <Link key={link.path} to={link.path}>
      <Button
        size="lg"
        variant="text"
        color="gray"
        fullWidth
        className="mb-1 flex items-center justify-start gap-2 font-rubik text-lg font-light tracking-wide text-gray-600"
      >
        <link.icon height={25} width={25} fill="currentColor" />
        {link.label}
      </Button>
    </Link>
  ))
);

export default UserLinks;
