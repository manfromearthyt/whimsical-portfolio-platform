
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SocialButton from '../components/ui/SocialButton';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 px-4">
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold">About Me</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="relative">
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg image-shine">
                  <img 
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80" 
                    alt="Nix - Artist and Animator" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div>
                <p className="text-lg leading-relaxed mb-6">
                  I'm an artist, animator, wayfarer, and teacher based in Trivandrum, India. Whether I'm creating captivating visuals, crafting engaging animations, exploring new horizons, or inspiring students, my passion lies in bringing creativity to life.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  My work combines traditional techniques with digital innovation, creating pieces that speak to both cultural heritage and contemporary imagination.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  As a teacher, I believe in nurturing creativity through structured guidance and free exploration. My courses are designed to build technical skills while encouraging students to develop their unique artistic voice.
                </p>
                <p className="text-lg leading-relaxed mb-8">
                  Connect with me personally on Instagram for collaborations or WhatsApp for inquiries—this is my portfolio.
                </p>
                
                <div className="flex items-center space-x-4">
                  <SocialButton
                    type="instagram"
                    href="https://instagram.com/NixFineArts"
                    size={40}
                  />
                  <SocialButton
                    type="whatsapp"
                    href={`https://wa.me/911234567890?text=${encodeURIComponent("Hi, I'm interested in your art/classes!")}`}
                    size={40}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-16">
              <h2 className="font-serif text-3xl font-semibold mb-6">My Journey</h2>
              <p className="text-lg leading-relaxed mb-6">
                My artistic journey began in the vibrant cultural landscape of Kerala, where I was surrounded by traditional art forms and stories. From there, I pursued formal education in fine arts and animation, blending classical techniques with modern digital approaches.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Over the years, I've collaborated with various creative studios, educational institutions, and independent projects, always seeking to push the boundaries of my craft and explore new forms of expression.
              </p>
              <p className="text-lg leading-relaxed">
                Today, I divide my time between creating, teaching, and exploring—finding inspiration in both the familiar and the unknown, and sharing that inspiration with others through my work and classes.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
