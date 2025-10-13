import HeaderLeft from './HeaderLeft';
import ThemeToggle from './ThemeToggle';
import NotificationButton from './NotificationButton';
import UserDropdown from './UserDropdown';

const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4">
        <HeaderLeft />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationButton />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
