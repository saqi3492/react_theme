import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/store/slices/uiSlice';
import { Bell, LogOut, Moon, Settings, Sun, User } from 'lucide-react';
import SharedLogo from '@/shared/SharedLogo';
import { logoutUser } from '@/lib/api';
import { handleLogout } from '@/utils/helper';
import ConfirmationDialog from '@/shared/ConfirmationDialog';

const Header = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.ui.theme);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <SharedLogo />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="hover:bg-accent inline-flex h-9 w-9 items-center justify-center rounded-md"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            className="hover:bg-accent relative inline-flex h-9 w-9 items-center justify-center rounded-md"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:bg-accent inline-flex items-center gap-2 rounded-md px-2 py-1.5">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block">Admin User</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        isLoading={isLoading}
        onOpenChange={setIsDialogOpen}
        onConfirm={async () => {
          setIsLoading(true);
          const result = await logoutUser();
          setIsLoading(false);
          if (result) {
            setIsDialogOpen(false);
            handleLogout();
          }
        }}
        title="Log Out"
        description="Are you sure you want to log out? You will need to log in again to access your account."
        confirmButtonText="Log Out"
      />
    </header>
  );
};

export default Header;
