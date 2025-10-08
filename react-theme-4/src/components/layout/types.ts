import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  path?: string;
  name: string;
  icon?: LucideIcon;
  actionType?: 'logout' | 'action';
  children?: NavItem[];
}
