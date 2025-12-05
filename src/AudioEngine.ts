export class AudioEngine {
    private audioContext: AudioContext | null = null;
    private oscillators: Map<string, { osc: OscillatorNode; gain: GainNode }> = new Map();
    private masterGain: GainNode | null = null;
    private isEnabled: boolean = false;
    private normalVolume: number = 0.15;
    private lowVolume: number = 0.01;

    public init(): void {
        if (this.audioContext) {
            // Resume if suspended
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            return;
        }

        this.audioContext = new AudioContext();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = this.normalVolume;
        this.masterGain.connect(this.audioContext.destination);
        this.isEnabled = true;

        // Resume if suspended (browser autoplay policy)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    public resume(): void {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    public setVolumeLow(): void {
        if (this.masterGain && this.audioContext) {
            this.masterGain.gain.setTargetAtTime(this.lowVolume, this.audioContext.currentTime, 0.3);
        }
    }

    public setVolumeNormal(): void {
        if (this.masterGain && this.audioContext) {
            this.masterGain.gain.setTargetAtTime(this.normalVolume, this.audioContext.currentTime, 0.3);
        }
    }

    private mapToFrequency(x: number, y: number, width: number, height: number): number {
        // Map X to base frequency (100-800 Hz)
        const baseFreq = 100 + (x / width) * 700;
        // Map Y to frequency modifier (0.5-2x)
        const yMod = 0.5 + (1 - y / height) * 1.5;
        return baseFreq * yMod;
    }

    public playTone(
        id: string,
        x: number,
        y: number,
        width: number,
        height: number,
        velocity: number
    ): void {
        if (!this.audioContext || !this.masterGain) return;

        // Resume audio context if suspended (required for browser autoplay policy)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        const ctx = this.audioContext;
        const existing = this.oscillators.get(id);

        const frequency = this.mapToFrequency(x, y, width, height);
        const gainValue = Math.min(0.3, velocity * 0.002);

        if (existing) {
            existing.osc.frequency.setTargetAtTime(frequency, ctx.currentTime, 0.05);
            existing.gain.gain.setTargetAtTime(gainValue, ctx.currentTime, 0.05);
        } else {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            // Use sine for smooth tones, vary based on position
            const waveTypes: OscillatorType[] = ['sine', 'triangle', 'sine', 'triangle'];
            osc.type = waveTypes[Math.floor((x / width) * waveTypes.length)];
            osc.frequency.value = frequency;

            gain.gain.value = 0;
            gain.gain.setTargetAtTime(gainValue, ctx.currentTime, 0.02);

            osc.connect(gain);
            gain.connect(this.masterGain!);
            osc.start();

            this.oscillators.set(id, { osc, gain });
        }
    }

    public stopTone(id: string): void {
        const existing = this.oscillators.get(id);
        if (existing && this.audioContext) {
            existing.gain.gain.setTargetAtTime(0, this.audioContext.currentTime, 0.1);
            setTimeout(() => {
                existing.osc.stop();
                existing.osc.disconnect();
                existing.gain.disconnect();
                this.oscillators.delete(id);
            }, 200);
        }
    }

    public stopAllTones(): void {
        this.oscillators.forEach((_, id) => this.stopTone(id));
    }

    public getIsEnabled(): boolean {
        return this.isEnabled;
    }
}

