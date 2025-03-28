
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarProvider, 
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { User, Settings, ShoppingCart, Users, CalendarDays } from 'lucide-react';

export default function AdminLayout() {
  const { user, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/login');
    }
  }, [user, isLoading, isAdmin, navigate]);

  // Show nothing during loading or if not authenticated/admin
  if (isLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <SidebarTrigger />
            <span className="ml-2 text-lg font-semibold">Admin Panel</span>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => navigate('/admin')}
                    isActive={location.pathname === '/admin'}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            
            <SidebarSeparator />
            
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => navigate('/admin/users')}
                    isActive={location.pathname === '/admin/users'}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <span>Users</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => navigate('/admin/products')}
                    isActive={location.pathname === '/admin/products'}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>Products</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => navigate('/admin/events')}
                    isActive={location.pathname === '/admin/events'}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span>Events</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            
            <SidebarSeparator />
            
            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => navigate('/admin/settings')}
                    isActive={location.pathname === '/admin/settings'}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1">
          <Header />
          <main className="pt-24 px-6 pb-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
