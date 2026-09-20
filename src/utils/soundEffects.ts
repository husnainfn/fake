// Web Audio API Synthesizer for high-energy comedy and prank sounds

class SoundEffectsManager {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'suspended') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // 1. Sad Trombone ("Wah-wah-wah-waaaah")
  playSadTrombone() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const notes = [
        { freq: 293.66, dur: 0.35, delay: 0 },     // D4
        { freq: 277.18, dur: 0.35, delay: 0.35 },  // C#4
        { freq: 261.63, dur: 0.35, delay: 0.7 },   // C4
        { freq: 246.94, dur: 1.1, delay: 1.05 },   // B3 (long slide)
      ];

      notes.forEach(({ freq, dur, delay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + delay);

        if (delay >= 1.0) {
          // Slide down pitch on final note
          osc.frequency.linearRampToValueAtTime(freq - 30, now + delay + dur);
        }

        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.25, now + delay + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + dur);
      });
    } catch {
      // AudioContext might be blocked until direct user interaction
    }
  }

  // 2. Clown Horn ("Honk Honk!")
  playClownHorn() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const honk = (startTime: number) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'triangle';

        osc1.frequency.setValueAtTime(440, startTime);
        osc2.frequency.setValueAtTime(554.37, startTime); // C#5

        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(startTime);
        osc2.start(startTime);
        osc1.stop(startTime + 0.18);
        osc2.stop(startTime + 0.18);
      };

      honk(now);
      honk(now + 0.16);
    } catch {}
  }

  // 3. Scam Siren Alarm (Two tone police / warning siren)
  playScamSiren() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      gain.gain.setValueAtTime(0.18, now);

      for (let i = 0; i < 4; i++) {
        const t = now + i * 0.4;
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.setValueAtTime(500, t + 0.2);
      }

      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.8);
    } catch {}
  }

  // 4. Dramatic "Dun Dun Dun!"
  playDramaticDun() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const hits = [
        { freq: 220, delay: 0, dur: 0.3 },
        { freq: 207.65, delay: 0.35, dur: 0.3 },
        { freq: 110, delay: 0.75, dur: 0.9 },
      ];

      hits.forEach(({ freq, delay, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.35, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + dur);
      });
    } catch {}
  }

  // 5. Comedy Laugh Buzz
  playLaughBuzz() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      
      // Series of quick comedic bouncy chirps
      for (let i = 0; i < 6; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + i * 0.12;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600 + (i % 2) * 200, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.1);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.1);
      }
    } catch {}
  }
}

export const sounds = new SoundEffectsManager();
