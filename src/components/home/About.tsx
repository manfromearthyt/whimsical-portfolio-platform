
import { useEffect, useRef } from 'react';
import SocialButton from '../ui/SocialButton';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section className="section-container py-20">
      <div 
        ref={aboutRef}
        className="max-w-4xl mx-auto animate-on-scroll"
      >
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold">About Me</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg image-shine">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80" 
                alt="Nix - Digital Artist" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 p-4 bg-accent rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center space-x-2">
                <SocialButton
                  type="instagram"
                  href="https://www.instagram.com/nix_fine_arts"
                  size={28}
                />
                <SocialButton
                  type="whatsapp"
                  href={`https://wa.me/911234567890?text=${encodeURIComponent("Hi, I'm interested in your art/classes!")}`}
                  size={28}
                />
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-lg leading-relaxed mb-6">
              I'm a digital artist specializing in portrait art and character design based in Trivandrum, India. My passion lies in creating lifelike digital portraits and unique character designs that capture personality and emotion.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              My work combines traditional artistic principles with digital techniques, creating pieces that blend realism with creative expression.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              Connect with me on Instagram to see my latest work or reach out via WhatsApp for commission inquiries and collaborations.
            </p>
            
            <div className="flex items-center space-x-4 md:hidden">
              <SocialButton
                type="instagram"
                href="https://www.instagram.com/nix_fine_arts"
                size={36}
              />
              <SocialButton
                type="whatsapp"
                href={`https://wa.me/911234567890?text=${encodeURIComponent("Hi, I'm interested in your art/classes!")}`}
                size={36}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
