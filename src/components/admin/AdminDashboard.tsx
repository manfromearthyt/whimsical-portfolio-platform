
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

type UserWithRole = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // First get users from auth.users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;
      
      // Then get roles
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('user_id, role');
        
      if (roleError) throw roleError;
      
      // Map roles to users
      const roleMap = new Map();
      roleData?.forEach(item => {
        roleMap.set(item.user_id, item.role);
      });
      
      const usersWithRoles = authUsers?.users.map(user => ({
        id: user.id,
        email: user.email || 'No email',
        role: roleMap.get(user.id) || 'user',
        created_at: user.created_at
      })) || [];
      
      setUsers(usersWithRoles);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error fetching users",
        description: error.message || "There was a problem loading the users.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const makeAdmin = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: 'admin' })
        .eq('user_id', userId);
        
      if (error) throw error;
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, role: 'admin' } 
          : user
      ));
      
      toast({
        title: "Role updated",
        description: "User is now an admin.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating role",
        description: error.message || "There was a problem updating the user role.",
        variant: "destructive",
      });
    }
  };
  
  const makeUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: 'user' })
        .eq('user_id', userId);
        
      if (error) throw error;
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, role: 'user' } 
          : user
      ));
      
      toast({
        title: "Role updated",
        description: "User role changed to regular user.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating role",
        description: error.message || "There was a problem updating the user role.",
        variant: "destructive",
      });
    }
  };
  
  const handleSetAdmin = async () => {
    if (!adminEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.admin.getUserByEmail(adminEmail);
      
      if (error || !data.user) {
        throw new Error("User not found with that email address");
      }
      
      await makeAdmin(data.user.id);
      setAdminEmail('');
      
      toast({
        title: "Success",
        description: `${adminEmail} is now an admin.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to set admin privileges.",
        variant: "destructive",
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="mt-2">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users Management</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Admin User</CardTitle>
              <CardDescription>
                Grant admin privileges to a user by email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="adminEmail">User Email</Label>
                  <Input 
                    id="adminEmail"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="user@example.com"
                  />
                </div>
                <div className="mt-8">
                  <Button onClick={handleSetAdmin}>Set as Admin</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user roles and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading users...</p>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-2 text-left font-medium">Email</th>
                          <th className="p-2 text-left font-medium">Role</th>
                          <th className="p-2 text-left font-medium">Created</th>
                          <th className="p-2 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id} className="border-b">
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                user.role === 'admin' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="p-2">{new Date(user.created_at).toLocaleDateString()}</td>
                            <td className="p-2">
                              {user.role === 'admin' ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => makeUser(user.id)}
                                >
                                  Remove Admin
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => makeAdmin(user.id)}
                                >
                                  Make Admin
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={fetchUsers}>Refresh Users List</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Manage global system settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>System settings will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
