/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PreLoginPortal } from './components/PreLoginPortal';
import { LoadingTroll } from './components/LoadingTroll';
import { ScamReveal } from './components/ScamReveal';

export default function App() {
  const [step, setStep] = useState<'portal' | 'loading' | 'scam'>('portal');
  const [victimName, setVictimName] = useState<string>('Lucky Winner');
  const [authorName, setAuthorName] = useState<string>('Husnain');
  const [selectedPrize, setSelectedPrize] = useState<string>('cash');

  // Read URL query params (?to=Hamza&by=Husnain)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to');
      const byParam = params.get('by');

      if (toParam && toParam.trim()) {
        setVictimName(decodeURIComponent(toParam.trim()));
      }
      if (byParam && byParam.trim()) {
        setAuthorName(decodeURIComponent(byParam.trim()));
      }
    } catch {
      // Safe fallback if search params parsing fails
    }
  }, []);

  const handleClaim = (prize: string, customName: string) => {
    setSelectedPrize(prize);
    setVictimName(customName);
    setStep('loading');
  };

  const handleLoadingComplete = () => {
    setStep('scam');
  };

  const handleReset = () => {
    setStep('portal');
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-amber-500 selection:text-slate-950">
      {step === 'portal' && (
        <PreLoginPortal
          victimName={victimName}
          authorName={authorName}
          onClaim={handleClaim}
        />
      )}

      {step === 'loading' && (
        <LoadingTroll
          victimName={victimName}
          onComplete={handleLoadingComplete}
        />
      )}

      {step === 'scam' && (
        <ScamReveal
          victimName={victimName}
          authorName={authorName}
          selectedPrize={selectedPrize}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
