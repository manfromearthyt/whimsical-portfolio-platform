
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import SocialButton from '../ui/SocialButton';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-background/95 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-serif font-semibold hover:opacity-80 transition-opacity"
        >
          Nix Fine Arts
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <div className="flex items-center space-x-4">
            {user ? (
              <Button asChild variant="outline" size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
            <div className="flex items-center space-x-2">
              <SocialButton
                type="instagram"
                href="https://instagram.com/NixFineArts"
                size={36}
                className="hover-lift"
              />
              <SocialButton
                type="whatsapp"
                href={`https://wa.me/911234567890?text=${encodeURIComponent("Hi, I'm interested in your art/classes!")}`}
                size={36}
                className="hover-lift"
              />
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden p-2 text-foreground rounded focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        <div 
          className={`fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="text-2xl font-serif font-semibold" onClick={() => setIsMenuOpen(false)}>
                Nix Fine Arts
              </Link>
              <button
                className="p-2 text-foreground rounded focus:outline-none"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              <NavLinks mobile={true} />
              
              {/* Auth links for mobile */}
              <div className="flex flex-col space-y-4 pt-4">
                {user ? (
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link to="/register">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-4 pt-6">
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
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const location = useLocation();
  const links = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/classes', label: 'Classes' },
    { path: '/events', label: 'Events' },
    { path: '/about', label: 'About' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`${
            mobile ? 'text-2xl font-medium py-2' : 'text-base font-medium'
          } ${
            location.pathname === link.path
              ? 'text-primary font-semibold'
              : 'text-foreground hover:text-primary'
          } transition-colors link-underline`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default Header;
