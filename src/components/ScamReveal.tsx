import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { 
  Volume2, 
  RotateCcw, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  AlertTriangle, 
  Smile, 
  Laugh, 
  PartyPopper,
  Sparkles
} from 'lucide-react';
import { TrollMeme } from '../types';

interface ScamRevealProps {
  victimName: string;
  authorName: string;
  selectedPrize: string;
  onReset: () => void;
}

const TROLL_MEMES: TrollMeme[] = [
  {
    id: '1',
    title: 'Bank Balance Update',
    subtitle: '0.00 PKR (Chai ke paise bhi nahi bache 😂)',
    emoji: '💸',
    badge: 'DECLINED',
  },
  {
    id: '2',
    title: 'Free Biryani Status',
    subtitle: 'Aalu bhi nahi mila, daal chawal khao 🍛',
    emoji: '🥔',
    badge: 'CANCELLED',
  },
  {
    id: '3',
    title: 'iPhone 16 Pro Max',
    subtitle: 'Replaced with Nokia 3310 with Snake 2 📱',
    emoji: '📟',
    badge: 'DOWNGRADED',
  },
  {
    id: '4',
    title: 'Husnain Special Note',
    subtitle: '"Dost hone ka farz nibha dia! Chai pila do ab" ☕',
    emoji: '🤝',
    badge: 'HUSNAIN APPROVED',
  },
];

export const ScamReveal: React.FC<ScamRevealProps> = ({
  victimName,
  authorName,
  selectedPrize,
  onReset,
}) => {
  const [friendName, setFriendName] = useState('');
  const [customAuthor, setCustomAuthor] = useState(authorName || 'Husnain');
  const [copied, setCopied] = useState(false);
  const [activeSound, setActiveSound] = useState<string | null>(null);

  // Trigger confetti burst and clown horn sound on mount
  useEffect(() => {
    // Confetti cannon
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });

    const secondBurst = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 400);

    // Play initial sound
    sounds.playClownHorn();

    return () => clearTimeout(secondBurst);
  }, []);

  const handlePlaySound = (soundType: string) => {
    setActiveSound(soundType);
    if (soundType === 'horn') sounds.playClownHorn();
    if (soundType === 'trombone') sounds.playSadTrombone();
    if (soundType === 'siren') sounds.playScamSiren();
    if (soundType === 'dun') sounds.playDramaticDun();
    if (soundType === 'buzz') sounds.playLaughBuzz();

    setTimeout(() => setActiveSound(null), 1000);
  };

  const getPrankUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const target = friendName.trim() ? encodeURIComponent(friendName.trim()) : 'Dost';
    const by = customAuthor.trim() ? encodeURIComponent(customAuthor.trim()) : 'Husnain';
    return `${baseUrl}?to=${target}&by=${by}`;
  };

  const copyPrankLink = () => {
    const url = getPrankUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const url = getPrankUrl();
    const text = encodeURIComponent(
      `🎁 Bro look! ${customAuthor} sent you an exclusive VIP reward voucher! Claim before it expires: ${url}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-start py-8 px-4 relative overflow-x-hidden">
      {/* Background Animated Neon Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Troll Box */}
      <div className="w-full max-w-3xl relative z-10 space-y-8 text-center">
        
        {/* Floating Emojis Banner */}
        <div className="flex items-center justify-center gap-3 text-3xl sm:text-5xl animate-bounce">
          <span>🤡</span>
          <span>🤣</span>
          <span>💀</span>
          <span>🎉</span>
          <span>🤪</span>
          <span>🗿</span>
        </div>

        {/* The Legendary Message */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 border-2 border-rose-500 text-rose-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-widest animate-pulse">
            <AlertTriangle className="w-4 h-4 text-rose-400" /> OFFICIAL TROLL CONFIRMED
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-rose-500 tracking-tight uppercase drop-shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
            SCAM HOGYA , BY {authorName.toUpperCase()}!
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-yellow-300">
            HAHAHA AYEIN?! KESA DIYA?! 🤣😂
          </p>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Dear <span className="text-amber-400 font-extrabold underline">{victimName || 'Dost'}</span>, you really thought{' '}
            <span className="text-rose-400 font-bold">{authorName}</span> was giving you free cash and an iPhone?! Bhai kuch nahi milne wala! You have been successfully bamboozled! 🤡
          </p>
        </div>

        {/* Troll Gullibility Meter */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Laugh className="w-4 h-4 text-amber-400" /> Bholapan / Gullibility Meter
            </span>
            <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
              100% MAXIMUM
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700/60 p-0.5">
            <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-rose-600 h-full rounded-full w-full animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-center">
            Diagnosis: Dil ka saaf, lekin internet pe aasaani se fasne wala! 😆
          </p>
        </div>

        {/* Soundboard Section */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider">
            <Volume2 className="w-4 h-4" /> Interactive Troll Soundboard (Click to Play!)
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <button
              id="sound-horn"
              onClick={() => handlePlaySound('horn')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all duration-150 flex flex-col items-center gap-1 cursor-pointer ${
                activeSound === 'horn'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 scale-95'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <span className="text-2xl">🤡</span>
              <span>Clown Horn</span>
              <span className="text-[10px] opacity-70">Honk Honk!</span>
            </button>

            <button
              id="sound-trombone"
              onClick={() => handlePlaySound('trombone')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all duration-150 flex flex-col items-center gap-1 cursor-pointer ${
                activeSound === 'trombone'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 scale-95'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <span className="text-2xl">🎺</span>
              <span>Sad Trombone</span>
              <span className="text-[10px] opacity-70">Wah Wah Waah</span>
            </button>

            <button
              id="sound-siren"
              onClick={() => handlePlaySound('siren')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all duration-150 flex flex-col items-center gap-1 cursor-pointer ${
                activeSound === 'siren'
                  ? 'bg-rose-500 text-white border-rose-400 scale-95'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <span className="text-2xl">🚨</span>
              <span>Scam Siren</span>
              <span className="text-[10px] opacity-70">Wee-Woo-Wee</span>
            </button>

            <button
              id="sound-dun"
              onClick={() => handlePlaySound('dun')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all duration-150 flex flex-col items-center gap-1 cursor-pointer ${
                activeSound === 'dun'
                  ? 'bg-purple-500 text-white border-purple-400 scale-95'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <span className="text-2xl">⚡</span>
              <span>Dun Dun Dun!</span>
              <span className="text-[10px] opacity-70">Dramatic Hit</span>
            </button>

            <button
              id="sound-buzz"
              onClick={() => handlePlaySound('buzz')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all duration-150 flex flex-col items-center gap-1 cursor-pointer col-span-2 sm:col-span-1 ${
                activeSound === 'buzz'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 scale-95'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <span className="text-2xl">🤪</span>
              <span>Laugh Chirp</span>
              <span className="text-[10px] opacity-70">Hehehe</span>
            </button>
          </div>
        </div>

        {/* Troll Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {TROLL_MEMES.map((meme) => (
            <div
              key={meme.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3 shadow-md"
            >
              <span className="text-3xl select-none mt-0.5">{meme.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white">{meme.title}</h4>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-700/50 text-rose-300">
                    {meme.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{meme.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Prank Your Friends Generator */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
          <div className="flex items-center gap-2 text-base font-bold text-white">
            <PartyPopper className="w-5 h-5 text-amber-400" />
            <span>Now It's Your Turn: Prank Your Friends!</span>
          </div>

          <p className="text-xs text-slate-400">
            Generate a personalized link for your friend. When they open it, it will show an official VIP claim screen with their name, and when they click claim: <strong>SCAM HOGYA!</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Friend's Name / Target:
              </label>
              <input
                id="input-friend-target"
                type="text"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                placeholder="e.g., Ali, Bilal, Sarah..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Your Name / Scammer Name:
              </label>
              <input
                id="input-prankster-name"
                type="text"
                value={customAuthor}
                onChange={(e) => setCustomAuthor(e.target.value)}
                placeholder="e.g., Husnain"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              id="button-copy-prank-link"
              onClick={copyPrankLink}
              className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Personalized Prank Link'}</span>
            </button>

            <button
              id="button-whatsapp-share"
              onClick={shareOnWhatsApp}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send via WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Reset / Experience Again Button */}
        <div className="pt-2">
          <button
            id="button-reset-prank"
            onClick={onReset}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Prank / Back to Prize Portal</span>
          </button>
        </div>

        {/* Little Signature Footer */}
        <p className="text-[11px] text-slate-600">
          Created for pure fun & laughs &bull; Certified Troll Production by {authorName} &bull; No feelings were harmed ✌️
        </p>
      </div>
    </div>
  );
};
