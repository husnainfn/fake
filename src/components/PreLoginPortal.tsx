import React, { useState, useEffect } from 'react';
import { Gift, ShieldCheck, Zap, Clock, Award, Sparkles, CheckCircle2, ChevronRight, AlertCircle, ArrowRight } from 'lucide-react';
import { PrizeOption, RecentClaim } from '../types';

interface PreLoginPortalProps {
  victimName: string;
  authorName: string;
  onClaim: (selectedPrize: string, customName: string) => void;
}

const PRIZES: PrizeOption[] = [
  {
    id: 'cash',
    title: '$50,000 Instant Cash Transfer',
    subtitle: 'Zero tax, instant clearance to bank or mobile wallet',
    icon: '💰',
    badge: 'MOST POPULAR',
    highlightColor: 'from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300',
  },
  {
    id: 'iphone',
    title: 'iPhone 16 Pro Max (1TB Titanium)',
    subtitle: 'Brand new sealed box with AppleCare+ & Gold EarPods',
    icon: '📱',
    badge: 'LIMITED STOCK',
    highlightColor: 'from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-300',
  },
  {
    id: 'biryani',
    title: 'Unlimited Free Biryani & Samosas For Life',
    subtitle: 'Delivered twice daily with chilled mint raita & cola',
    icon: '🍗',
    badge: 'HOT DEAL 🔥',
    highlightColor: 'from-orange-500/20 to-red-500/10 border-orange-500/40 text-orange-300',
  },
  {
    id: 'car',
    title: '2026 Sports Car Keys or $150k Voucher',
    subtitle: 'Fully insured with VIP gold license plate',
    icon: '🏎️',
    badge: 'SUPER VIP',
    highlightColor: 'from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-300',
  },
];

const RECENT_CLAIMS: RecentClaim[] = [
  { name: 'Hamza A.', city: 'Lahore', prize: '$50,000 Cash', timeAgo: '2m ago' },
  { name: 'Bilal K.', city: 'Karachi', prize: 'iPhone 16 Pro Max', timeAgo: '4m ago' },
  { name: 'Zainab M.', city: 'Islamabad', prize: 'Unlimited Biryani Pass', timeAgo: '7m ago' },
  { name: 'Usman T.', city: 'Rawalpindi', prize: '$50,000 Cash', timeAgo: '9m ago' },
];

export const PreLoginPortal: React.FC<PreLoginPortalProps> = ({
  victimName,
  authorName,
  onClaim,
}) => {
  const [selectedPrize, setSelectedPrize] = useState<string>('cash');
  const [nameInput, setNameInput] = useState<string>(victimName || '');
  const [secretCode, setSecretCode] = useState<string>('HUSNAIN-VIP-777');
  const [payoutMethod, setPayoutMethod] = useState<string>('Direct Bank / JazzCash / EasyPaisa');
  const [agreed, setAgreed] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string>('');

  // Countdown timer for fake urgency
  const [timeLeft, setTimeLeft] = useState<{ m: number; s: number; ms: number }>({
    m: 4,
    s: 58,
    ms: 94,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.ms > 0) return { ...prev, ms: prev.ms - 4 };
        if (prev.s > 0) return { ...prev, s: prev.s - 1, ms: 99 };
        if (prev.m > 0) return { m: prev.m - 1, s: 59, ms: 99 };
        return { m: 4, s: 59, ms: 99 };
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setValidationError('Please enter your name or nickname to verify the transfer!');
      return;
    }
    if (!agreed) {
      setValidationError('Please confirm verification to proceed.');
      return;
    }
    setValidationError('');
    onClaim(selectedPrize, nameInput.trim());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start pb-16">
      {/* Top Banner Alert */}
      <div className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-950 px-4 py-2 text-center text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-md">
        <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
        <span>SPECIAL PRIVATE ALLOCATION CONFIRMED BY {authorName.toUpperCase()}</span>
        <span className="hidden md:inline">|</span>
        <span className="hidden md:inline font-mono">CODE: #HST-99482-EXCLUSIVE</span>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl px-4 pt-8 sm:pt-12">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> 100% Verified Prize Pool &bull; Instant Claim
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Exclusive VIP Rewards Portal
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            You have received an exclusive access pass verified by{' '}
            <span className="font-bold text-amber-400 underline decoration-amber-400/50 underline-offset-4">
              {authorName}
            </span>
            . Complete the quick identity verification below to release your guaranteed payout.
          </p>

          {/* Urgency Countdown Card */}
          <div className="inline-flex items-center gap-3 bg-rose-950/40 border border-rose-500/30 px-4 py-2 rounded-xl text-rose-300 text-sm font-medium">
            <Clock className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Time remaining to claim allocation:</span>
            <span className="font-mono font-bold text-rose-200 text-base bg-rose-900/50 px-2 py-0.5 rounded">
              0{timeLeft.m}:{timeLeft.s < 10 ? `0${timeLeft.s}` : timeLeft.s}.
              {timeLeft.ms < 10 ? `0${timeLeft.ms}` : timeLeft.ms}
            </span>
          </div>
        </div>

        {/* Live Winners Ticker */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 mb-8 shadow-inner overflow-hidden">
          <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live Verification Activity (Last 10 minutes)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {RECENT_CLAIMS.map((claim, idx) => (
              <div key={idx} className="bg-slate-800/60 rounded-lg p-2 border border-slate-700/50 text-xs">
                <div className="font-semibold text-slate-200 truncate">{claim.name} ({claim.city})</div>
                <div className="text-amber-400 text-[11px] truncate font-medium">{claim.prize}</div>
                <div className="text-slate-500 text-[10px]">{claim.timeAgo}</div>
              </div>
            ))}
          </div>
        </div>

        {/* The Claim Form */}
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Step 1: Prize Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-200 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">1</span>
                Select Your Guaranteed Reward:
              </span>
              <span className="text-xs text-amber-400 font-normal">Included in Husnain's Allocation</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRIZES.map((prize) => {
                const isSelected = selectedPrize === prize.id;
                return (
                  <div
                    key={prize.id}
                    id={`prize-option-${prize.id}`}
                    onClick={() => setSelectedPrize(prize.id)}
                    className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-slate-800/90 border-amber-400 ring-2 ring-amber-400/20 shadow-lg'
                        : 'bg-slate-800/40 border-slate-700/80 hover:bg-slate-800/60 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-3xl select-none mt-0.5">{prize.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-white text-sm sm:text-base leading-snug">
                          {prize.title}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{prize.subtitle}</p>
                      <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-300 uppercase tracking-wider">
                        {prize.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Verification Details */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">2</span>
              Recipient Verification Details:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Recipient Full Name / Nickname <span className="text-rose-400">*</span>
                </label>
                <input
                  id="input-recipient-name"
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g., Hamza, Ali, Shahzad..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  VIP Referral Passcode (Locked)
                </label>
                <input
                  id="input-referral-code"
                  type="text"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-amber-400 font-mono text-sm tracking-wider focus:outline-none"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Preferred Delivery / Dispatch Channel
              </label>
              <select
                id="select-payout-method"
                value={payoutMethod}
                onChange={(e) => setPayoutMethod(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              >
                <option value="Direct Bank / JazzCash / EasyPaisa">Direct Instant Transfer (JazzCash / EasyPaisa / Bank)</option>
                <option value="Doorstep Drone Delivery">Express VIP Doorstep Delivery (Within 30 minutes)</option>
                <option value="Personal Handover from Husnain">VIP Meet & Greet with Husnain (Coffee included)</option>
              </select>
            </div>

            {/* Checkbox agreement */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-400 select-none">
                <input
                  id="checkbox-terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-4 h-4 bg-slate-950"
                />
                <span>
                  I confirm that my details are accurate and I am ready to accept this life-changing reward.
                  I acknowledge {authorName}'s generous sponsorship.
                </span>
              </label>
            </div>

            {validationError && (
              <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              id="button-claim-prize"
              type="submit"
              className="w-full relative group overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-extrabold text-base sm:text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer"
            >
              <Gift className="w-5 h-5 text-slate-950 animate-bounce" />
              <span>CONFIRM & UNLOCK MY REWARD NOW</span>
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-2 flex items-center justify-center gap-1.5">
              <Zap className="w-3 h-3 text-amber-500" /> End-to-end encrypted transfer &bull; Instant release upon confirmation
            </p>
          </div>
        </form>

        {/* Footer Trust Section */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-slate-500 border-t border-slate-800/80 pt-6">
          <div className="space-y-1">
            <div className="font-semibold text-slate-400">🛡️ 100% Legit & Safe</div>
            <div>No credit card needed</div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-slate-400">⚡ 5-Second Processing</div>
            <div>Automated distribution</div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-slate-400">👑 Certified by Husnain</div>
            <div>Official Ambassador Award</div>
          </div>
        </div>
      </div>
    </div>
  );
};
