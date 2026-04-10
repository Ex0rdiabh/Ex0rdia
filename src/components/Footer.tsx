import { Link } from 'react-router-dom';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper pt-32 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-24">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-10 group">
              <Logo className="w-24 h-12 text-paper" />
            </Link>
            <p className="text-paper/40 text-sm leading-relaxed max-w-xs font-light italic font-serif">
              "A streamlined creative booking portal built for clear briefs, practical follow-up, and a smoother first client experience."
            </p>
          </div>
          
          <div>
            <h3 className="text-gold font-bold mb-10 uppercase tracking-[0.4em] text-[10px]">Connect</h3>
            <div className="flex space-x-6 mb-10">
              <a 
                href="https://www.instagram.com/exordiabh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 bg-paper/5 rounded-2xl flex items-center justify-center hover:bg-gold hover:text-ink transition-all group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="mailto:Ex0rdia@outlook.com"
                className="w-14 h-14 bg-paper/5 rounded-2xl flex items-center justify-center hover:bg-gold hover:text-ink transition-all group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://wa.me/97336222349"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-paper/5 rounded-2xl flex items-center justify-center hover:bg-gold hover:text-ink transition-all group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <a 
                href="mailto:Ex0rdia@outlook.com" 
                className="text-[11px] text-paper/40 font-bold uppercase tracking-widest-xl hover:text-gold transition-colors flex items-center gap-4"
              >
                <Mail className="w-4 h-4 text-gold" />
                <span>Ex0rdia@outlook.com</span>
              </a>
              <a 
                href="https://www.instagram.com/exordiabh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] text-paper/40 font-bold uppercase tracking-widest-xl hover:text-gold transition-colors flex items-center gap-4"
              >
                <Instagram className="w-4 h-4 text-gold" />
                <span>@exordiabh</span>
              </a>
              <a 
                href="https://wa.me/97336222349"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-paper/40 font-bold uppercase tracking-widest-xl hover:text-gold transition-colors flex items-center gap-4"
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                <span>+973 36222349</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-paper/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-paper/20 text-[10px] font-bold uppercase tracking-[0.4em]">
            © 2026 Exordia Creative Services. All rights reserved.
          </p>
          <div className="flex space-x-12 text-[10px] text-paper/20 font-bold uppercase tracking-[0.4em]">
            <Link to="/privacy" className="hover:text-paper transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-paper transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
    </footer>
  );
}
