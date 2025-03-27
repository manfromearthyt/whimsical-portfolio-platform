
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PasswordResetForm from '../components/auth/PasswordResetForm';

const ResetPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 px-4 pb-16">
        <section className="section-container max-w-md mx-auto">
          <PasswordResetForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
