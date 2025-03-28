
import { useEffect, useRef } from 'react';
import SocialButton from '../ui/SocialButton';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const opacity = Math.max(1 - scrollPosition / 700, 0);
      const transform = `translateY(${scrollPosition * 0.3}px)`;
      
      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = transform;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPortfolio = () => {
    const portfolioElement = document.getElementById('portfolio');
    if (portfolioElement) {
      portfolioElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-4 overflow-hidden" 
      style={{ 
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.9)), url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight animate-scale-up">
          Nix Fine Arts
        </h1>
        <p className="mt-6 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto animate-fade-in">
          Digital Art, Character Design, and Portraits from Trivandrum, India
        </p>
        
        <div className="mt-8 flex items-center justify-center space-x-4 animate-slide-up">
          <SocialButton
            type="instagram"
            href="https://www.instagram.com/nix_fine_arts"
            size={40}
          />
          <SocialButton
            type="whatsapp"
            href={`https://wa.me/911234567890?text=${encodeURIComponent("Hi, I'm interested in your art/classes!")}`}
            size={40}
          />
        </div>
        
        <button 
          onClick={scrollToPortfolio}
          className="mt-16 inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors animate-float"
          aria-label="Scroll down to portfolio"
        >
          <span className="sr-only">Scroll down</span>
          <ArrowDown size={32} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
