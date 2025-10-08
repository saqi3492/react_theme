import { HelpCircle, LogOut } from 'lucide-react';
import type { NavItem } from './types';

const bottomNavItems: NavItem[] = [
  { path: '/help', name: 'Help', icon: HelpCircle },
  { path: undefined, name: 'Logout', icon: LogOut, actionType: 'logout' },
];

export default bottomNavItems;
