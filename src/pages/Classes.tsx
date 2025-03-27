
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Classes = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 px-4">
        <section className="section-container">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Classes</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn art and animation techniques through my comprehensive courses. Coming soon!
            </p>
          </div>
          
          <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-muted rounded-lg">
            <p className="text-xl text-muted-foreground">Course catalog will be available soon.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Classes;
