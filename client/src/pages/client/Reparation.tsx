import React from 'react';
import { Button } from '../../components/ui/Button';
import { 
  Wrench, 
  Cpu, 
  ThermometerSnowflake, 
  Database, 
  ShieldCheck, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';

export const Reparation = () => {
  const WHATSAPP_NUMBER = "22900000000"; // À remplacer par le vrai numéro
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour,%20je%20souhaite%20un%20diagnostic%20pour%20une%20r%C3%A9paration.`;

  const services = [
    {
      icon: ThermometerSnowflake,
      title: "Optimisation Thermique",
      desc: "Nettoyage complet, dépoussiérage et changement de pâte thermique haute performance (Kryonaut/Liquid Metal)."
    },
    {
      icon: Cpu,
      title: "Diagnostic Hardware",
      desc: "Analyse approfondie des composants défectueux, tests de charge et remplacement de pièces spécifiques."
    },
    {
      icon: Database,
      title: "Récupération & Upgrade",
      desc: "Migration vers SSD NVMe, récupération de données perdues et réinstallation système d'exploitation propre."
    },
    {
      icon: ShieldCheck,
      title: "Intervention Sur Mesure",
      desc: "Micro-soudure, réparation de charnières, changement d'écran ou de clavier d'ordinateur portable."
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bg">
      <div className="container-custom">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-xs text-white/70 tracking-wide">Pôle d'Expertise Technique</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter text-white">
            Diagnostic & <br />
            <span className="premium-gradient-text">réparation.</span>
          </h1>
          <p className="text-lg text-nld-muted leading-relaxed">
            Parce que chaque machine mérite une seconde vie. Nos ingénieurs diagnostiquent et réparent 
            votre matériel avec des outils professionnels et des composants rigoureusement certifiés.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Services Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="premium-card p-8 bg-panel">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent mb-6 shadow-sm">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{service.title}</h3>
                <p className="text-sm text-nld-muted leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section (WhatsApp) */}
          <div className="lg:col-span-5">
            <div className="premium-card p-10 bg-panel sticky top-32 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                <Wrench className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Besoin d'une intervention ?</h2>
              <p className="text-nld-muted text-sm mb-8 leading-relaxed">
                Connectez-vous directement avec notre équipe d'experts sur WhatsApp. 
                Envoyez-nous les détails de votre problème ou une vidéo, et nous vous établirons une estimation immédiate.
              </p>

              <div className="w-full space-y-4">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white shadow-[#25D366]/20 shadow-lg group border-none">
                    <MessageCircle className="w-5 h-5 mr-3" />
                    CONTACTER SUR WHATSAPP
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                
                <div className="flex items-center justify-center gap-2 text-xs text-nld-muted font-medium pt-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Techniciens en ligne. Réponse en -15 min.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
