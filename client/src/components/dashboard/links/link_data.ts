import AdminIcon from '@icons/dashboard_icons/admin_panel_settings.svg?react';
import CartIcon from '@icons/dashboard_icons/cart_icon_filled.svg?react';
import ProductIcon from '@icons/dashboard_icons/category.svg?react';
import HomeIcon from '@icons/dashboard_icons/home.svg?react';
import UserIcon from '@icons/dashboard_icons/user_icon.svg?react';

import { RouteName } from '@/utils';

const { DASHBOARD, HOME } = RouteName;
interface LinkItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  path: string;
}

export interface LinksToRender {
  links: LinkItem[];
}

export const UserLinksList = {
  links: [
    {
      icon: HomeIcon,
      label: 'Home',
      path: HOME,
    },
    {
      icon: UserIcon,
      label: 'User Info',
      path: '/dashboard/user/user_info',
    },
    {
      icon: CartIcon,
      label: 'My Cart',
      path: `${DASHBOARD}/user/cart`,
    },
  ],
};

export const AdminLinks = {
  links: [
    {
      icon: ProductIcon,
      label: 'Products',
      path: '/dashboard/admin/products',
    },
    {
      icon: AdminIcon,
      label: 'Manage Site',
      path: '/dashboard/admin/site',
    },
  ],
};
