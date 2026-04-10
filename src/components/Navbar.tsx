import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const middleLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Vision & Mission', href: '/vision' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const rightLink = { name: 'Start Booking', href: '/book' };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled ? "glass-paper py-4 shadow-sm" : "bg-transparent py-8"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-4 group">
              <Logo className="w-24 h-12 text-ink" />
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 items-center justify-between ml-20">
            <div className="flex items-center space-x-12">
              {middleLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-widest-xl transition-all hover:text-gold relative group py-2",
                    location.pathname === link.href 
                      ? "text-gold" 
                      : "text-ink/60"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-px bg-gold transition-transform duration-300 origin-left",
                    location.pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}></span>
                </Link>
              ))}
            </div>

            <Link
              to={rightLink.href}
              className={cn(
                "text-[11px] font-bold uppercase tracking-widest-xl transition-all hover:text-gold relative group py-2",
                location.pathname === rightLink.href 
                  ? "text-gold" 
                  : "text-ink/60"
              )}
            >
              {rightLink.name}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-px bg-gold transition-transform duration-300 origin-left",
                location.pathname === rightLink.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )}></span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-ink/60 hover:text-ink transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-paper border-t border-ink/5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-4 pb-12 space-y-4">
            {[...middleLinks, rightLink].map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-4 text-sm font-bold uppercase tracking-widest-xl",
                  location.pathname === link.href 
                    ? "text-gold bg-ink/5 rounded-2xl" 
                    : "text-ink/60"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
