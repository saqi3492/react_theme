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
import { showToast } from '@/lib/toast';

const Header = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.ui.theme);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-foreground hover:bg-accent" />
          <SharedLogo />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            onClick={() => {
              showToast.success('Login successful! Welcome back.');
            }}
            className="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring relative inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">AA</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block">Admin User</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
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
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
