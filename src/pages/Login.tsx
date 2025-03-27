
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 px-4 pb-16">
        <section className="section-container max-w-md mx-auto">
          <LoginForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
