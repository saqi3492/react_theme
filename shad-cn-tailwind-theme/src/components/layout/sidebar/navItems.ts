import {
  Briefcase,
  Building2,
  CheckSquare,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutGrid,
  LogOut,
  Settings,
  User,
  UserCog,
  Users,
} from 'lucide-react';

export const navItems: NavItem[] = [
  { path: '/dashboard', name: 'Dashboard', icon: LayoutGrid },
  {
    name: 'Configuration',
    icon: Briefcase,
    children: [
      { path: '/configuration/staff-types', name: 'Staff Types', icon: UserCog },
      { path: '/configuration/documents', name: 'Documents', icon: FileText },
    ],
  },
  { path: '/tasks', name: 'Tasks', icon: CheckSquare },
  { path: '/central-record', name: 'Central Record', icon: User },
  { path: '/users', name: 'Users', icon: Users },
  { path: '/venues', name: 'Venues', icon: Building2 },
  { path: '/billing', name: 'Billing', icon: CreditCard },
  { path: '/settings', name: 'Settings', icon: Settings },
];

export const bottomNavItems: NavItem[] = [
  { path: '/help', name: 'Help', icon: HelpCircle },
  { path: undefined, name: 'Logout', icon: LogOut, actionType: 'logout' },
];

import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  path?: string;
  name: string;
  icon?: LucideIcon;
  actionType?: 'logout' | 'action';
  children?: NavItem[];
}
