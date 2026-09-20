import React, { useState, useEffect } from 'react';
import { Loader2, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

interface LoadingTrollProps {
  onComplete: () => void;
  victimName: string;
}

const LOADING_STAGES = [
  'Connecting to Central Swiss Reserve Bank...',
  'Authorizing 1,000,000 PKR / USD Transfer...',
  'Dispatching Golden Biryani delivery helicopter...',
  'Checking Husnain\'s VIP signature database...',
  'Encrypting final transfer codes...',
  'Almost ready... Releasing your prize!',
];

export const LoadingTroll: React.FC<LoadingTrollProps> = ({ onComplete, victimName }) => {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStageIndex((prev) => {
        if (prev < LOADING_STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 350);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 10;
      });
    }, 280);

    return () => {
      clearInterval(stageTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glowing background orb */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white">
              Processing Allocation for {victimName || 'VIP Guest'}...
            </h2>
            <p className="text-sm text-slate-400 min-h-[2.5rem] flex items-center justify-center transition-all duration-200">
              {LOADING_STAGES[stageIndex]}
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700/60 p-0.5">
              <div
                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-200"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-500">
              <span>Security Hash: #HST-77</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-emerald-400/80 bg-emerald-950/30 border border-emerald-800/40 py-2 px-3 rounded-lg">
            <ShieldAlert className="w-4 h-4" />
            <span>Do not close this window. Handshake in progress.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
