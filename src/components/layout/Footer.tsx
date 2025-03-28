
import { Link } from 'react-router-dom';
import SocialButton from '../ui/SocialButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Nix Fine Arts</h3>
            <p className="text-muted-foreground max-w-md">
              Digital Art, Character Design, and Portraits from Trivandrum, India.
            </p>
            <div className="flex items-center space-x-3 mt-4">
              <SocialButton
                type="instagram"
                href="https://www.instagram.com/nix_fine_arts"
                size={32}
              />
              <SocialButton
                type="whatsapp"
                href={`https://wa.me/911234567890?text=${encodeURIComponent("Hi, I'm interested in your art!")}`}
                size={32}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-4">Site Map</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                Shop
              </Link>
              <Link to="/classes" className="text-muted-foreground hover:text-foreground transition-colors">
                Classes
              </Link>
              <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                Events
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-4">Contact Me</h3>
            <p className="text-muted-foreground mb-3">
              Feel free to reach out for portrait commissions, character designs, or just to say hello!
            </p>
            <a 
              href={`https://wa.me/911234567890?text=${encodeURIComponent("Hi, I'm interested in commissioning some artwork!")}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Nix Fine Arts. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-muted-foreground text-sm">
              Based in Trivandrum, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
