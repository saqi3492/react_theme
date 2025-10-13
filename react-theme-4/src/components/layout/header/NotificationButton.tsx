import { Bell } from 'lucide-react';

const NotificationButton = () => {
  return (
    <button className="hover:bg-accent relative inline-flex h-9 w-9 items-center justify-center rounded-md" aria-label="Notifications">
      <Bell className="h-5 w-5" />
      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
    </button>
  );
};

export default NotificationButton;
