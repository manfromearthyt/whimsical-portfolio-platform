
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 px-4">
        <section className="section-container">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Shop</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse and purchase original artwork and animations. Coming soon!
            </p>
          </div>
          
          <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-muted rounded-lg">
            <p className="text-xl text-muted-foreground">Shop content will be available soon.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
