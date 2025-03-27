
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold">My Dashboard</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Welcome back to your personal workspace.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> {user?.email}</p>
              <Button 
                onClick={() => navigate('/profile')}
                variant="outline" 
                className="w-full mt-4"
              >
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>View your enrolled courses</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/my-classes')}
              variant="outline" 
              className="w-full"
            >
              View My Classes
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>My Purchases</CardTitle>
            <CardDescription>Track your art purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/my-purchases')}
              variant="outline" 
              className="w-full"
            >
              View Purchase History
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12 text-center">
        <Button 
          variant="outline"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    </section>
  );
};

export default Dashboard;
