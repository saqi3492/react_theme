import {
  Briefcase,
  Building2,
  CheckSquare,
  CreditCard,
  FileText,
  FolderKanban,
  LayoutGrid,
  Settings,
  User,
  UserCog,
  Users,
} from 'lucide-react';
import type { NavItem } from './types';

const navItems: NavItem[] = [
  { path: '/dashboard', name: 'Dashboard', icon: LayoutGrid },
  {
    name: 'Configuration',
    icon: Briefcase,
    children: [
      { path: '/configuration', name: 'Overview', icon: FolderKanban },
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

export default navItems;
