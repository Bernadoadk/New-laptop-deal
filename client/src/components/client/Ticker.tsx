import React from 'react';

export const Ticker = () => {
  const items = [
    'LIVRAISON GRATUITE SUR CALAVI & COTONOU',
    'GAMING PC CONFIGURATEUR DISPONIBLE',
    'SAV DISPONIBLE 7J/7',
    'PROMOTIONS SUR LES LAPTOPS RTX 40-SERIES',
    'NEW LAPTOP DEAL — VOTRE PARTENAIRE GAMING AU BÉNIN',
  ];

  return (
    <div className="bg-accent py-1.5 overflow-hidden border-b border-white/10">
      <div className="flex whitespace-nowrap animate-ticker">
        {[...items, ...items].map((item, idx) => (
          <span key={idx} className="font-mono text-[10px] font-black tracking-widest text-bg mx-8 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-bg transform rotate-45" /> {item}
          </span>
        ))}
      </div>
    </div>
  );
};
