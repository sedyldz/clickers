interface Wave {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    opacity: number;
    hue: number;
    startTime: number;
}

export class WaveCanvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private waves: Wave[] = [];
    private lastPos: { x: number; y: number; time: number } | null = null;
    private animationId: number | null = null;
    private mouseDown: boolean = false;
    private onMouseMoveCallback?: (x: number, y: number, velocity: number) => void;
    private onMouseDownCallback?: () => void;

    constructor(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error(`Canvas element with id "${canvasId}" not found`);
        }
        
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Could not get 2D context from canvas');
        }
        this.ctx = ctx;

        this.resize();
        this.setupEventListeners();
        this.animate();
    }

    public setCallbacks(
        onMouseMove?: (x: number, y: number, velocity: number) => void,
        onMouseDown?: () => void
    ): void {
        this.onMouseMoveCallback = onMouseMove;
        this.onMouseDownCallback = onMouseDown;
    }

    private resize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private createWave(x: number, y: number, velocity: number): void {
        const hue = 180 + (x / window.innerWidth) * 140; // Cyan to magenta
        const maxRadius = 50 + velocity * 0.5;

        this.waves.push({
            x,
            y,
            radius: 0,
            maxRadius,
            opacity: 0.8,
            hue,
            startTime: performance.now(),
        });

        // Limit waves
        if (this.waves.length > 100) {
            this.waves.shift();
        }
    }

    private draw(): void {
        // Clear with slight trail effect
        this.ctx.fillStyle = 'rgba(8, 10, 15, 0.15)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const now = performance.now();

        // Draw waves
        this.waves = this.waves.filter(wave => {
            const elapsed = now - wave.startTime;
            const progress = elapsed / 1500; // 1.5 second lifespan
            if (progress >= 1) return false;

            wave.radius = wave.maxRadius * progress;
            wave.opacity = 0.8 * (1 - progress);

            // Draw multiple rings for glow effect
            for (let i = 0; i < 3; i++) {
                const ringRadius = wave.radius - i * 3;
                if (ringRadius > 0) {
                    this.ctx.beginPath();
                    this.ctx.arc(wave.x, wave.y, ringRadius, 0, Math.PI * 2);
                    this.ctx.strokeStyle = `hsla(${wave.hue}, 100%, ${60 + i * 10}%, ${wave.opacity * (1 - i * 0.3)})`;
                    this.ctx.lineWidth = 2 - i * 0.5;
                    this.ctx.stroke();
                }
            }

            // Draw connecting lines between nearby waves
            this.waves.forEach(otherWave => {
                if (wave === otherWave) return;
                const dx = otherWave.x - wave.x;
                const dy = otherWave.y - wave.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150 && dist > 0) {
                    const lineOpacity = (1 - dist / 150) * wave.opacity * otherWave.opacity * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(wave.x, wave.y);
                    this.ctx.lineTo(otherWave.x, otherWave.y);
                    this.ctx.strokeStyle = `hsla(${(wave.hue + otherWave.hue) / 2}, 100%, 60%, ${lineOpacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });

            return true;
        });
    }

    private animate = (): void => {
        this.draw();
        this.animationId = requestAnimationFrame(this.animate);
    };

    private setupEventListeners(): void {
        window.addEventListener('resize', () => {
            this.resize();
        });

        this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            const now = performance.now();

            let velocity = 0;
            if (this.lastPos) {
                const dx = x - this.lastPos.x;
                const dy = y - this.lastPos.y;
                const dt = (now - this.lastPos.time) / 1000;
                velocity = Math.sqrt(dx * dx + dy * dy) / Math.max(dt, 0.001);
            }

            this.lastPos = { x, y, time: now };

            // Create waves based on velocity
            if (velocity > 50 || this.mouseDown) {
                this.createWave(x, y, velocity);
            }

            if (this.onMouseMoveCallback) {
                this.onMouseMoveCallback(x, y, velocity);
            }
        });

        this.canvas.addEventListener('mousedown', (e: MouseEvent) => {
            this.mouseDown = true;
            this.createWave(e.clientX, e.clientY, 100);
            if (this.onMouseDownCallback) {
                this.onMouseDownCallback();
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.mouseDown = false;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouseDown = false;
            this.lastPos = null;
        });
    }

    public destroy(): void {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.resize);
    }
}

