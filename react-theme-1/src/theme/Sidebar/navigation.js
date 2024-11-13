import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import TableChartIcon from '@mui/icons-material/TableChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatIcon from '@mui/icons-material/Chat';
import LockIcon from '@mui/icons-material/Lock';
import PagesIcon from '@mui/icons-material/Pages';
import DescriptionIcon from '@mui/icons-material/Description';

// Define the navigation items with icons
export const navigations = [
  {
    type: 'label',
    label: 'Dashboard'
  },
  {
    name: 'Listing',
    path: '/listing',
    icon: DashboardIcon
  },
  {
    name: 'Sales 1',
    path: '/dashboard/sales',
    icon: TrendingUpIcon
  },
  {
    name: 'Sales 2',
    path: '/dashboard/sales-v2',
    icon: TrendingUpIcon
  },
  {
    name: 'Hiring',
    path: '/dashboard/job-management',
    icon: PeopleIcon
  },
  {
    name: 'Project 1',
    path: '/dashboard/project-management',
    icon: AssignmentIcon
  },
  {
    name: 'Project 2',
    path: '/dashboard/project-management-v2',
    icon: AssignmentIcon
  },
  {
    name: 'CRM',
    path: '/dashboard/crm',
    icon: BusinessCenterIcon,
    badge: {
      value: '30'
    }
  },
  {
    name: 'SaaS',
    path: '/dashboard/saas',
    icon: SettingsApplicationsIcon
  },
  {
    type: 'label',
    label: 'Management'
  },
  {
    name: 'Profiles',
    icon: PeopleIcon,
    children: [
      {
        name: 'Profile 1',
        path: '/dashboard/profile'
      },
      {
        name: 'Profile 2',
        path: '/dashboard/profile-v2'
      }
    ]
  },
  {
    name: 'Accounts',
    icon: LockIcon,
    children: [
      {
        name: 'Account 1',
        path: '/dashboard/account'
      },
      {
        name: 'Account 2',
        path: '/dashboard/account-v2'
      }
    ]
  },
  {
    name: 'User & Contact',
    icon: PeopleIcon,
    children: [
      {
        name: 'Add User',
        path: '/dashboard/add-user'
      },
      {
        name: 'User List 1',
        path: '/dashboard/user-list'
      },
      {
        name: 'User List 2',
        path: '/dashboard/user-list-v2'
      },
      {
        name: 'User Grid 1',
        path: '/dashboard/user-grid'
      },
      {
        name: 'User Grid 2',
        path: '/dashboard/user-grid-v2'
      },
      {
        name: 'Contact List',
        path: '/dashboard/contact-list'
      },
      {
        name: 'Contact Grid',
        path: '/dashboard/contact-grid'
      }
    ]
  },
  {
    name: 'Invoice',
    icon: DescriptionIcon,
    children: [
      {
        name: 'Invoice List 1',
        path: '/dashboard/invoice-list'
      },
      {
        name: 'Invoice List 2',
        path: '/dashboard/invoice-list-v2'
      },
      {
        name: 'Invoice Details 1',
        path: '/dashboard/invoice-details'
      },
      {
        name: 'Invoice Details 2',
        path: '/dashboard/invoice-details-v2'
      },
      {
        name: 'Create Invoice 1',
        path: '/dashboard/create-invoice'
      },
      {
        name: 'Create Invoice 2',
        path: '/dashboard/create-invoice-v2'
      }
    ]
  },
  {
    name: 'Ecommerce',
    icon: ShoppingCartIcon,
    children: [
      {
        name: 'Cart',
        path: '/dashboard/cart'
      },
      {
        name: 'Payment',
        path: '/dashboard/payment'
      },
      {
        name: 'Billing Address',
        path: '/dashboard/billing-address'
      },
      {
        name: 'Product Details',
        path: '/dashboard/product-details'
      },
      {
        name: 'Shop 1',
        path: '/dashboard/shop'
      },
      {
        name: 'Shop 2',
        path: '/dashboard/shop-v2'
      },
      {
        name: 'Checkout 1',
        path: '/dashboard/checkout'
      },
      {
        name: 'Checkout 2',
        path: '/dashboard/checkout-v2'
      },
      {
        name: 'Payment Complete 1',
        path: '/dashboard/payment-complete'
      },
      {
        name: 'Payment Complete 2',
        path: '/dashboard/payment-complete-v2'
      }
    ]
  },
  {
    name: 'Admin Ecommerce',
    icon: SettingsApplicationsIcon,
    children: [
      {
        name: 'Product List',
        path: '/dashboard/product-list'
      },
      {
        name: 'Product Grid',
        path: '/dashboard/product-grid'
      },
      {
        name: 'Create Product',
        path: '/dashboard/create-product'
      },
      {
        name: 'Order Management',
        path: '/dashboard/order-management'
      },
      {
        name: 'Product Management',
        path: '/dashboard/product-management'
      },
      {
        name: 'Customer Management',
        path: '/dashboard/customer-management'
      }
    ]
  },
  {
    name: 'Projects',
    icon: AssignmentIcon,
    children: [
      {
        name: 'Project List 1',
        path: '/dashboard/project-v1'
      },
      {
        name: 'Project List 2',
        path: '/dashboard/project-v2'
      },
      {
        name: 'Project List 3',
        path: '/dashboard/project-v3'
      },
      {
        name: 'Team Member',
        path: '/dashboard/team-member'
      },
      {
        name: 'Project Details',
        path: '/dashboard/project-details'
      }
    ]
  },
  {
    name: 'Data Table',
    icon: TableChartIcon,
    path: '/dashboard/data-table-v2'
  },
  {
    type: 'label',
    label: 'Apps'
  },
  {
    name: 'Todo List',
    icon: CheckCircleIcon,
    path: '/dashboard/todo-list'
  },
  {
    name: 'Calendar',
    icon: CalendarTodayIcon,
    path: '/dashboard/calender'
  },
  {
    name: 'Chats',
    icon: ChatIcon,
    children: [
      {
        name: 'Chat 1',
        path: '/dashboard/chat-v1'
      },
      {
        name: 'Chat 2',
        path: '/dashboard/chat-v2'
      }
    ]
  },
  {
    name: 'Sessions',
    icon: LockIcon,
    children: [
      {
        iconText: 'RT',
        name: 'Sign In',
        children: [
          {
            name: 'Sign In 1',
            path: '/login'
          },
          {
            name: 'Sign In 2',
            path: '/login-v2'
          }
        ]
      },
      {
        iconText: 'RT',
        name: 'Register',
        children: [
          {
            name: 'Register 1',
            path: '/register'
          },
          {
            name: 'Register 2',
            path: '/register-v2'
          }
        ]
      },
      {
        iconText: 'RT',
        name: 'Forget Password',
        children: [
          {
            name: 'Forget Password 1',
            path: '/forget-password'
          },
          {
            name: 'Forget Password 2',
            path: '/forget-password-v2'
          }
        ]
      },
      {
        name: 'Two Step Verification',
        path: '/two-step-verification'
      }
    ]
  },
  {
    name: 'Pages',
    icon: PagesIcon,
    children: [
      {
        name: 'Pricing',
        path: '/dashboard/pricing'
      },
      {
        name: 'About',
        path: '/dashboard/about'
      },
      {
        name: 'Contact',
        path: '/dashboard/contact'
      },
      {
        name: 'Privacy',
        path: '/dashboard/privacy'
      }
    ]
  },
  {
    name: 'Documentation',
    icon: DescriptionIcon,
    type: 'extLink',
    path: 'https://uko-react-doc.vercel.app/'
  }
];
