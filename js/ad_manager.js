const AdManager = {
    adStats: {
        impressions: 1420,
        clicks: 38,
        estimatedRevenue: 12.45
    },

    init() {
        this.renderAdPlaceholders();
        this.startAdImpressionCounter();
    },

    renderAdPlaceholders() {
        const slots = document.querySelectorAll('.ad-slot');
        slots.forEach(slot => {
            if (slot.classList.contains('ad-banner-top')) {
                slot.innerHTML = `
                    <div class="ad-label">ADVERTISEMENT (728x90)</div>
                    <div style="text-align:center;">
                        <strong style="color:var(--primary);">🔥 MONETIZE YOUR MEMES ON YANKU.COM</strong><br>
                        <span style="font-size:0.75rem; color:var(--text-muted);">High-CPM Ad Unit • Click to Learn More</span>
                    </div>
                `;
            } else if (slot.classList.contains('ad-sidebar')) {
                slot.innerHTML = `
                    <div class="ad-label">SPONSORED (300x600)</div>
                    <div style="text-align:center; padding:1.5rem;">
                        <div style="font-size:3rem; margin-bottom:1rem;">🚀</div>
                        <h4 style="color:var(--secondary); margin-bottom:0.5rem;">Join Yanku PRO</h4>
                        <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:1.5rem;">Unlimited AI Auto-Pilot Meme Generation & Zero Ads!</p>
                        <button class="btn btn-primary" style="font-size:0.8rem;">Upgrade Now</button>
                    </div>
                `;
            } else if (slot.classList.contains('ad-sticky-footer')) {
                slot.innerHTML = `
                    <div class="ad-label">STICKY BANNER</div>
                    <div style="display:flex; align-items:center; justify-content:space-between; width:100%; padding:0 2rem;">
                        <span>📢 <strong>Yanku.com Publisher Ad Network Active</strong></span>
                        <button class="btn btn-secondary" onclick="document.querySelector('.ad-sticky-footer').style.display='none'" style="font-size:0.75rem; padding:0.3rem 0.6rem;">Close X</button>
                    </div>
                `;
            }
        });
    },

    startAdImpressionCounter() {
        setInterval(() => {
            this.adStats.impressions += Math.floor(Math.random() * 3) + 1;
            this.adStats.estimatedRevenue += 0.02;

            const impEl = document.getElementById('ad-stat-impressions');
            const revEl = document.getElementById('ad-stat-revenue');

            if (impEl) impEl.innerText = this.adStats.impressions.toLocaleString();
            if (revEl) revEl.innerText = `$${this.adStats.estimatedRevenue.toFixed(2)}`;
        }, 5000);
    }
};
