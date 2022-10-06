import { MdOutlinePhonelink } from 'react-icons/md';
import './app.css'

export const navigations = [
  {
    name: 'Dashboard',
    path: '/dashboard/analytics',
    icon: 'dashboard',
  },
  {
    name: 'Orders',
    icon: 'description',
    children: [
      {
        name: 'Orders',
        path: '/orders/',
        iconText: 'O',
      },
      {
        name: 'Abadoned Orders',
        path: '/abadoned-orders/',
        iconText: 'A',
      },
    ],
  },
  {
    name: 'Product',
    icon: 'local_grocery_store',
    children: [
      {
        name: 'Products',
        path: '/products',
        iconText: 'P',
      },
      {
        name: 'Tags',
        path: '/tags',
        iconText: 'T',
      },
      {
        name: 'Brands',
        path: '/brands',
        iconText: 'B',
      },
      {
        name: 'Categories',
        path: '/product-categories',
        iconText: 'C',
      },
      {
        name: 'Features',
        path: '/features',
        iconText: 'F',
      },
    ],
  },
  {
    name: 'Shipping',
    icon: 'card_giftcard',
    children: [
      {
        name: 'Shipping Classes',
        path: '/shipping-classes',
        iconText: 'C',
      },
      {
        name: 'Shipping Options',
        path: '/shipping-options',
        iconText: 'O',
      },
      {
        name: 'Shipping Zones',
        path: '/shipping-zones',
        iconText: 'Z',
      },
      {
        name: 'Shipping Option Group',
        path: '/shipping-group',
        iconText: 'G',
      },
    ],
  },
  {
    name: 'Coupons',
    icon: 'card_giftcard',
    path: '/coupons',
  },
  {
    name: 'Vendors',
    icon: 'wc',
    path: '/vendors',
  },
  {
    name: 'Customers',
    icon: 'group',
    path: '/customers',
  },
  {
    name: 'Users',
    icon: 'group_add',
    children: [
      {
        name: 'Users',
        path: '/users',
        iconText: 'B',
      },
    ],
  },
  {
    name: 'USSD',
    icon: 'phonelink',
    children: [
      {
        name: 'Featured Categories',
        path: '/ussd-featured-categories',
        iconText: '',
      },
      {
        name: 'DOC Pickup Centers',
        path: '/doc-pickup-centers',
        iconText: '',
      },
      {
        name: 'USSD Special Orders',
        path: '/ussd-special-orders',
        iconText: '',
      },
      {
        name: 'USSD Products',
        path: '/ussd-products',
        iconText: '',
      },
    ],
  },
  {
    name: 'Agent Network',
    icon: 'border_color',
    children: [
      {
        name: 'All Agents',
        path: '/agents',
        iconText: 'B',
      },
      /*  {
        name: "Agent Applications",
        path: "/agent-applications",
        iconText: "B"
      }, */
    ],
  },
  {
    name: 'Settings',
    icon: 'border_color',
    children: [
      {
        name: 'Account settings',
        path: '/user-settings',
        iconText: 'B',
      },
      {
        name: 'Layout settings',
        path: '/forms/editor',
        iconText: 'E',
      },
    ],
  },
];
