const CanvasStudio = {
    canvas: null,
    ctx: null,

    init() {
        this.canvas = document.getElementById('studio-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.render();

        document.getElementById('input-top-text')?.addEventListener('input', () => this.render());
        document.getElementById('input-bottom-text')?.addEventListener('input', () => this.render());
        document.getElementById('select-bg-theme')?.addEventListener('change', () => this.render());
    },

    render() {
        if (!this.canvas || !this.ctx) return;

        const top = document.getElementById('input-top-text')?.value || 'CUSTOM MEME TOP TEXT';
        const bottom = document.getElementById('input-bottom-text')?.value || 'CUSTOM BOTTOM TEXT';
        const theme = document.getElementById('select-bg-theme')?.value || 'cyber';

        // Draw Canvas Background
        const grad = this.ctx.createLinearGradient(0, 0, 600, 600);
        if (theme === 'cyber') {
            grad.addColorStop(0, '#020617');
            grad.addColorStop(1, '#1e1b4b');
        } else if (theme === 'fire') {
            grad.addColorStop(0, '#450a0a');
            grad.addColorStop(1, '#7f1d1d');
        } else {
            grad.addColorStop(0, '#064e3b');
            grad.addColorStop(1, '#022c22');
        }
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, 600, 600);

        // Draw Center Graphic
        this.ctx.font = '100px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(theme === 'cyber' ? '⚡' : theme === 'fire' ? '🔥' : '💎', 300, 300);

        // Typography
        this.ctx.font = '900 40px "Impact", sans-serif';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 5;
        this.ctx.textAlign = 'center';

        // Top Text
        this.ctx.strokeText(top.toUpperCase(), 300, 70);
        this.ctx.fillText(top.toUpperCase(), 300, 70);

        // Bottom Text
        this.ctx.strokeText(bottom.toUpperCase(), 300, 540);
        this.ctx.fillText(bottom.toUpperCase(), 300, 540);

        // Watermark
        this.ctx.font = '600 16px "Inter", sans-serif';
        this.ctx.fillStyle = 'rgba(0, 242, 254, 0.7)';
        this.ctx.fillText('yanku.com studio', 500, 580);
    },

    downloadStudioMeme() {
        if (!this.canvas) return;
        const link = document.createElement('a');
        link.download = `yanku-studio-${Date.now()}.png`;
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }
};
