const MemeEngine = {
    templates: [
        { name: 'Dark Mode Dev', bgGradient: ['#0f172a', '#1e293b'], icon: '💻' },
        { name: 'Cyberpunk Hacker', bgGradient: ['#020617', '#030712'], icon: '⚡' },
        { name: 'Crypto Rocket', bgGradient: ['#1e1b4b', '#311b92'], icon: '🚀' },
        { name: 'AI Overlord', bgGradient: ['#14532d', '#052e16'], icon: '🤖' },
        { name: 'Coffee Bug', bgGradient: ['#451a03', '#78350f'], icon: '☕' },
        { name: 'Full Stack Chaos', bgGradient: ['#701a75', '#4c0519'], icon: '🔥' }
    ],

    topTexts: [
        "WHEN CODE WORKS ON FIRST TRY",
        "ME AT 3 AM FIXING A TYPO",
        "AI WILL TAKE OUR JOBS",
        "CLIENT: JUST ONE SMALL CHANGE",
        "SENIOR DEV LOOKING AT MY PR",
        "IT WORKED IN LOCAL ENVIRONMENT",
        "WHEN THE PROD DB BACKUP FAILS",
        "WRITING TESTS VS RUNNING TESTS"
    ],

    bottomTexts: [
        "SUSPICIOUS AF 🤨",
        "NOW 5 NEW BUGS APPEARED 🐛",
        "STILL CANNOT ALIGN A DIV 🎨",
        "REWRITES THE ENTIRE BACKEND 😭",
        "APPROVES WITHOUT READING 🚀",
        "SHIP IT ANYWAY 🚢",
        "PANIC IN 4K HIGH DEFINITION 📹",
        "100% PASS RATE IN MY DREAMS 😴"
    ],

    autoPilotInterval: null,
    isAutoPilotActive: false,

    init() {
        this.generateRandomMeme();
    },

    getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    createMemeCanvas(template, topText, bottomText) {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        // Draw Gradient Background
        const grad = ctx.createLinearGradient(0, 0, 600, 600);
        grad.addColorStop(0, template.bgGradient[0]);
        grad.addColorStop(1, template.bgGradient[1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 600, 600);

        // Draw Subtle Grid Pattern
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 600; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0); ctx.lineTo(i, 600);
            ctx.moveTo(0, i); ctx.lineTo(600, i);
            ctx.stroke();
        }

        // Draw Central Icon Emoji
        ctx.font = '120px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(template.icon, 300, 300);

        // Configure Impact Meme Typography
        ctx.font = '900 42px "Impact", "Bungee", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 6;
        ctx.textAlign = 'center';

        // Draw Top Text
        ctx.strokeText(topText, 300, 70);
        ctx.fillText(topText, 300, 70);

        // Draw Bottom Text
        ctx.strokeText(bottomText, 300, 540);
        ctx.fillText(bottomText, 300, 540);

        // Watermark
        ctx.font = '600 16px "Inter", sans-serif';
        ctx.fillStyle = 'rgba(0, 242, 254, 0.6)';
        ctx.fillText('yanku.com', 530, 580);

        return canvas;
    },

    generateRandomMeme() {
        const tmpl = this.getRandomElement(this.templates);
        const top = this.getRandomElement(this.topTexts);
        const bottom = this.getRandomElement(this.bottomTexts);

        const canvas = this.createMemeCanvas(tmpl, top, bottom);
        const dataUrl = canvas.toDataURL('image/png');

        this.appendMemeToFeed({
            id: Date.now(),
            templateName: tmpl.name,
            topText: top,
            bottomText: bottom,
            imageUrl: dataUrl,
            likes: Math.floor(Math.random() * 850) + 120
        });
    },

    appendMemeToFeed(meme) {
        const feed = document.getElementById('meme-feed-grid');
        if (!feed) return;

        const card = document.createElement('div');
        card.className = 'meme-card';
        card.innerHTML = `
            <div class="meme-display">
                <img src="${meme.imageUrl}" class="meme-canvas-render" alt="${meme.topText}">
            </div>
            <div class="meme-info">
                <div class="meme-title">${meme.topText}</div>
                <div class="meme-meta">
                    <span>Template: ${meme.templateName}</span>
                    <span>🔥 ${meme.likes} Likes</span>
                </div>
                <div class="meme-actions">
                    <button class="action-btn" onclick="MemeEngine.likeMeme(this)">❤️ Like</button>
                    <button class="action-btn" onclick="MemeEngine.downloadMeme('${meme.imageUrl}')">⬇️ Download</button>
                    <button class="action-btn" onclick="MemeEngine.shareMeme()">🔗 Share</button>
                </div>
            </div>
        `;

        feed.prepend(card);
    },

    toggleAutoPilot() {
        this.isAutoPilotActive = !this.isAutoPilotActive;
        const toggleBtn = document.getElementById('autopilot-btn');

        if (this.isAutoPilotActive) {
            if (toggleBtn) toggleBtn.classList.add('active');
            this.autoPilotInterval = setInterval(() => {
                this.generateRandomMeme();
            }, 3500);
        } else {
            if (toggleBtn) toggleBtn.classList.remove('active');
            clearInterval(this.autoPilotInterval);
        }
    },

    likeMeme(btn) {
        btn.innerText = '💖 Liked!';
        btn.style.color = '#ff0844';
        btn.style.borderColor = '#ff0844';
    },

    downloadMeme(dataUrl) {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `yanku-meme-${Date.now()}.png`;
        a.click();
    },

    shareMeme() {
        navigator.clipboard.writeText(window.location.href);
        alert('Meme URL copied to clipboard! Share it anywhere.');
    }
};
