import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { AppSidebar } from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto bg-background p-6">
            <Suspense fallback={<LoadingSpinner type="page" />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
