import React from 'react';
import { Laptop, Instagram, Facebook, Twitter, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-bg border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-premium-glow group-hover:scale-110 transition-transform">
                <Laptop className="text-white w-6 h-6" />
              </div>
              <span className="font-outfit font-black text-xl text-white tracking-widest">NLD <span className="premium-gradient-text">SYSTEMS.</span></span>
            </Link>
            <p className="text-nld-muted text-lg leading-relaxed mb-8 max-w-sm font-medium">
              L'excellence technologique au Bénin. Matériel de pointe, conceptions sur mesure et assistance technique de premier ordre.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 text-nld-muted hover:text-white hover:bg-accent/10 hover:border-accent/20 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-8 tracking-[0.2em] text-xs uppercase opacity-40">Navigation</h4>
            <ul className="space-y-4">
              {['Accueil', 'Catalogue', 'Configurateur', 'Services Pro'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-nld-muted hover:text-accent transition-colors text-sm font-bold flex items-center group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-8 tracking-[0.2em] text-xs uppercase opacity-40">Support</h4>
            <ul className="space-y-4">
              {['Garantie Expert', 'Mentions Légales', 'Conditions de Vente', 'Support Client'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-nld-muted hover:text-accent transition-colors text-sm font-bold flex items-center group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-bold text-white mb-8 tracking-[0.2em] text-xs uppercase opacity-40">Contact Direct</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/5">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <span className="text-nld-muted text-sm font-medium leading-relaxed">
                  Abomey-Calavi, Quartier Kpota,<br />Immeuble Blue Zone, Bénin
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/5">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-nld-muted text-sm font-bold">+229 90 00 00 00</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/5">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <span className="text-nld-muted text-sm font-bold">expertise@nldsystems.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-nld-muted/40 uppercase tracking-[0.3em]">
          <span>&copy; 2026 NLD SYSTEMS. L'EXCELLENCE MATÉRIELLE.</span>
          <div className="flex gap-10">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS OF SERVICE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
