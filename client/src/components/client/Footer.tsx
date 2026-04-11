import React from 'react';
import { Laptop, Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-bg-2 border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                <Laptop className="text-bg w-5 h-5" />
              </div>
              <span className="font-orbitron font-black text-lg text-white">NEW LAPTOP <span className="text-accent">DEAL</span></span>
            </Link>
            <p className="text-nld-muted2 text-sm leading-relaxed mb-6">
              L'univers du gaming ultime au Bénin. Matériel de pointe, builds personnalisés et service après-vente d'expert.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 glass-panel flex items-center justify-center hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 glass-panel flex items-center justify-center hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 glass-panel flex items-center justify-center hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-accent mb-6 tracking-widest text-sm">MENU</h4>
            <ul className="space-y-4">
              {['Accueil', 'Catalogue', 'Configurateur', 'Services Réparation'].map((item) => (
                <li key={item}><Link to="#" className="text-nld-muted2 hover:text-white transition-colors text-sm uppercase font-medium">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-accent mb-6 tracking-widest text-sm">AIDE</h4>
            <ul className="space-y-4">
              {['Garantie & SAV', 'Mentions Légales', 'Modes de Paiement', 'Nous Contacter'].map((item) => (
                <li key={item}><Link to="#" className="text-nld-muted2 hover:text-white transition-colors text-sm uppercase font-medium">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-accent mb-6 tracking-widest text-sm">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-nld-muted2">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Abomey-Calavi, Quartier Kpota, Immeuble Blue Zone</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-nld-muted2">
                <Phone className="w-5 h-5 text-accent" />
                <span>+229 90 00 00 00</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-nld-muted2">
                <Mail className="w-5 h-5 text-accent" />
                <span>contact@newlaptopdeal.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-nld-muted tracking-widest">
          <span>&copy; 2026 NEW LAPTOP DEAL. TOUS DROITS RÉSERVÉS.</span>
          <div className="flex gap-8">
            <span>DESIGN BY CYBER_CORE</span>
            <span>POWERED BY NLD_TECH</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
