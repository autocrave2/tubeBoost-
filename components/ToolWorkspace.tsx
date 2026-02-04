
import React from 'react';
import { Sparkles } from 'lucide-react';

interface ToolWorkspaceProps {
  title: string;
  description: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

export const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({ title, description, children, icon }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
        <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
          {icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold font-jakarta">{title}</h1>
          <p className="text-slate-400">{description}</p>
        </div>
      </div>
      <div className="glass-panel p-8 rounded-2xl shadow-xl">
        {children}
      </div>
    </div>
  );
};
