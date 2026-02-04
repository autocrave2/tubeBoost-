
import React from 'react';
import { AdProps } from '../types';

export const AdSpace: React.FC<AdProps> = ({ type, provider = 'adsterra' }) => {
  const dimensions = {
    banner: 'w-full h-24',
    sidebar: 'w-full h-64',
    inline: 'w-full h-32'
  };

  return (
    <div className={`${dimensions[type]} bg-slate-900/50 border border-dashed border-slate-700 flex items-center justify-center rounded-lg overflow-hidden relative group`}>
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
      <div className="text-center z-10">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Advertisement</p>
        <p className="text-sm font-medium text-slate-400 capitalize">{provider} Placement</p>
      </div>
      <div className="absolute bottom-1 right-2 text-[8px] text-slate-600">TubeBoost Monetization Engine</div>
    </div>
  );
};
