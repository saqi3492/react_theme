import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import navItems from './navItems';
import bottomNavItems from './bottomNavItems';
import type { NavItem } from './types';
import { handleLogout } from '@/utils/helper';

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();

  const handleItemClick = (item: NavItem) => {
    if (item.actionType === 'logout') {
      handleLogout();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (item: NavItem): boolean => {
    if (!item.path) return false;
    return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  };

  const hasActiveChild = (item: NavItem): boolean => {
    if (!item.children) return false;
    return item.children.some(child => isActive(child));
  };

  const renderMenuItem = (item: NavItem) => {
    if (item.children) {
      return (
        <Collapsible key={item.name} asChild defaultOpen={hasActiveChild(item)} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="text-base">
                {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                <span>{item.name}</span>
                <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.children.map(subItem => (
                  <SidebarMenuSubItem key={subItem.name}>
                    <SidebarMenuSubButton onClick={() => handleItemClick(subItem)} isActive={isActive(subItem)} className="text-base">
                      {subItem.icon && <subItem.icon className="h-5 w-5 shrink-0" />}
                      <span className="text-base">{subItem.name}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuItem key={item.name}>
        <SidebarMenuButton
          onClick={() => handleItemClick(item)}
          isActive={isActive(item)}
          tooltip={state === 'collapsed' ? item.name : undefined}
          className="text-base"
        >
          {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
          <span className="text-base">{item.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b px-4 py-4">
        {state === 'expanded' ? (
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
              <span className="text-lg font-bold">R</span>
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-base font-semibold">React Theme</span>
              <span className="text-muted-foreground truncate text-sm">v4.0</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="bg-primary text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
              <span className="text-lg font-bold">R</span>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{navItems.map(item => renderMenuItem(item))}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          {bottomNavItems.map(item => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                onClick={() => handleItemClick(item)}
                isActive={isActive(item)}
                tooltip={state === 'collapsed' ? item.name : undefined}
                className="text-base"
              >
                {item.icon && <item.icon className="h-5 w-5 shrink-0" />}
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
