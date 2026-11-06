/**
 * Cinematic Web Audio Sound Engine
 * Synthesizes film projector clatter, motor spool, clapper snap, and sub-bass whoosh
 * entirely client-side without relying on fragile external audio URLs.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private motorNode: AudioBufferSourceNode | null = null;
  private motorGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.motorGain && this.ctx) {
      this.motorGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Film clapperboard snap
   */
  public playClapper() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const t = ctx.currentTime;
    // Transient click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.06);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);

    // High frequency snap noise
    this.playNoiseBurst(0.05, 0.35, 2000);
  }

  /**
   * Continuous 35mm projector motor & sprocket clatter
   */
  public startProjectorRoll() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    this.stopProjectorRoll();

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate mechanical sprocket clicks + flutter noise
    for (let i = 0; i < bufferSize; i++) {
      const sprocketTick = (i % Math.floor(ctx.sampleRate / 24)) < 24 ? 0.4 : 0;
      const noise = (Math.random() * 2 - 1) * 0.12;
      data[i] = sprocketTick + noise;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Filter to sound like a 35mm projector in a booth
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(1.8, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 0.4);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    this.motorNode = source;
    this.motorGain = gain;
  }

  public stopProjectorRoll() {
    if (this.motorGain && this.ctx) {
      this.motorGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      setTimeout(() => {
        if (this.motorNode) {
          try {
            this.motorNode.stop();
            this.motorNode.disconnect();
          } catch {
            // ignore if already stopped
          }
          this.motorNode = null;
        }
      }, 350);
    }
  }

  /**
   * Deep cinema sub-bass boom & impact swell
   */
  public playCinematicImpact() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const t = ctx.currentTime;

    // Sub-bass sine sweep (60Hz -> 28Hz)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(75, t);
    osc.frequency.exponentialRampToValueAtTime(32, t + 1.2);

    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 1.9);

    // Warm cinematic whoosh
    this.playNoiseBurst(0.8, 0.25, 400);
  }

  private playNoiseBurst(duration: number, volume: number, cutoff: number) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
    noise.stop(t + duration);
  }
}

export const soundEngine = new SoundEngine();
