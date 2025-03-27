
import Hero from '../components/home/Hero';
import Portfolio from '../components/home/Portfolio';
import About from '../components/home/About';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
