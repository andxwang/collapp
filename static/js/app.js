/* ==================================================================
   Collapp – Photo Collage Maker  •  Frontend Application
   ================================================================== */

// ──────────────────────────────────────────────────────────────────
// LAYOUT DEFINITIONS
// ──────────────────────────────────────────────────────────────────

const LAYOUTS = {

    '3-vertical': {
        name: '3 Vertical',
        tileCount: 3,
        generateTiles(w, h) {
            const th = Math.floor(h / 3);
            return [
                { x: 0, y: 0,      w, h: th },
                { x: 0, y: th,     w, h: th },
                { x: 0, y: 2 * th, w, h: h - 2 * th },
            ];
        },
        getDividers() {
            return [
                { orientation: 'h', tilesA: [0], tilesB: [1] },
                { orientation: 'h', tilesA: [1], tilesB: [2] },
            ];
        },
        previewSVG: `<svg viewBox="0 0 40 60" fill="none">
            <rect x="2" y="2"  width="36" height="17" rx="2" fill="#94a3b8"/>
            <rect x="2" y="21" width="36" height="17" rx="2" fill="#94a3b8"/>
            <rect x="2" y="40" width="36" height="18" rx="2" fill="#94a3b8"/>
        </svg>`,
    },

    '4-vertical': {
        name: '4 Vertical',
        tileCount: 4,
        generateTiles(w, h) {
            const th = Math.floor(h / 4);
            return [
                { x: 0, y: 0,      w, h: th },
                { x: 0, y: th,     w, h: th },
                { x: 0, y: 2 * th, w, h: th },
                { x: 0, y: 3 * th, w, h: h - 3 * th },
            ];
        },
        getDividers() {
            return [
                { orientation: 'h', tilesA: [0], tilesB: [1] },
                { orientation: 'h', tilesA: [1], tilesB: [2] },
                { orientation: 'h', tilesA: [2], tilesB: [3] },
            ];
        },
        previewSVG: `<svg viewBox="0 0 40 60" fill="none">
            <rect x="2" y="2"  width="36" height="12" rx="2" fill="#94a3b8"/>
            <rect x="2" y="16" width="36" height="12" rx="2" fill="#94a3b8"/>
            <rect x="2" y="30" width="36" height="12" rx="2" fill="#94a3b8"/>
            <rect x="2" y="44" width="36" height="14" rx="2" fill="#94a3b8"/>
        </svg>`,
    },

    '4-grid': {
        name: '2\u00d72 Grid',
        tileCount: 4,
        generateTiles(w, h) {
            const tw = Math.floor(w / 2);
            const th = Math.floor(h / 2);
            return [
                { x: 0,  y: 0,  w: tw,     h: th },
                { x: tw, y: 0,  w: w - tw,  h: th },
                { x: 0,  y: th, w: tw,     h: h - th },
                { x: tw, y: th, w: w - tw,  h: h - th },
            ];
        },
        getDividers() {
            return [
                { orientation: 'v', tilesA: [0, 2], tilesB: [1, 3] },
                { orientation: 'h', tilesA: [0, 1], tilesB: [2, 3] },
            ];
        },
        previewSVG: `<svg viewBox="0 0 40 60" fill="none">
            <rect x="2"  y="2"  width="16" height="27" rx="2" fill="#94a3b8"/>
            <rect x="22" y="2"  width="16" height="27" rx="2" fill="#94a3b8"/>
            <rect x="2"  y="31" width="16" height="27" rx="2" fill="#94a3b8"/>
            <rect x="22" y="31" width="16" height="27" rx="2" fill="#94a3b8"/>
        </svg>`,
    },

    '5-2-3': {
        name: '2 + 3',
        tileCount: 5,
        generateTiles(w, h) {
            const cw = Math.floor(w / 2);
            const lh = Math.floor(h / 2);
            const rh = Math.floor(h / 3);
            return [
                { x: 0,  y: 0,      w: cw,      h: lh },
                { x: 0,  y: lh,     w: cw,      h: h - lh },
                { x: cw, y: 0,      w: w - cw,  h: rh },
                { x: cw, y: rh,     w: w - cw,  h: rh },
                { x: cw, y: 2 * rh, w: w - cw,  h: h - 2 * rh },
            ];
        },
        getDividers() {
            return [
                { orientation: 'v', tilesA: [0, 1],    tilesB: [2, 3, 4] },
                { orientation: 'h', tilesA: [0],        tilesB: [1] },
                { orientation: 'h', tilesA: [2],        tilesB: [3] },
                { orientation: 'h', tilesA: [3],        tilesB: [4] },
            ];
        },
        previewSVG: `<svg viewBox="0 0 40 60" fill="none">
            <rect x="2"  y="2"  width="16" height="27" rx="2" fill="#94a3b8"/>
            <rect x="2"  y="31" width="16" height="27" rx="2" fill="#94a3b8"/>
            <rect x="22" y="2"  width="16" height="17" rx="2" fill="#94a3b8"/>
            <rect x="22" y="21" width="16" height="17" rx="2" fill="#94a3b8"/>
            <rect x="22" y="40" width="16" height="18" rx="2" fill="#94a3b8"/>
        </svg>`,
    },

    '5-3-2': {
        name: '3 + 2',
        tileCount: 5,
        generateTiles(w, h) {
            const cw = Math.floor(w / 2);
            const lh = Math.floor(h / 3);
            const rh = Math.floor(h / 2);
            return [
                { x: 0,  y: 0,      w: cw,      h: lh },
                { x: 0,  y: lh,     w: cw,      h: lh },
                { x: 0,  y: 2 * lh, w: cw,      h: h - 2 * lh },
                { x: cw, y: 0,      w: w - cw,  h: rh },
                { x: cw, y: rh,     w: w - cw,  h: h - rh },
            ];
        },
        getDividers() {
            return [
                { orientation: 'v', tilesA: [0, 1, 2], tilesB: [3, 4] },
                { orientation: 'h', tilesA: [0],        tilesB: [1] },
                { orientation: 'h', tilesA: [1],        tilesB: [2] },
                { orientation: 'h', tilesA: [3],        tilesB: [4] },
            ];
        },
        previewSVG: `<svg viewBox="0 0 40 60" fill="none">
            <rect x="2"  y="2"  width="16" height="17" rx="2" fill="#94a3b8"/>
            <rect x="2"  y="21" width="16" height="17" rx="2" fill="#94a3b8"/>
            <rect x="2"  y="40" width="16" height="18" rx="2" fill="#94a3b8"/>
            <rect x="22" y="2"  width="16" height="27" rx="2" fill="#94a3b8"/>
            <rect x="22" y="31" width="16" height="27" rx="2" fill="#94a3b8"/>
        </svg>`,
    },
};


// ──────────────────────────────────────────────────────────────────
// MAIN APPLICATION CLASS
// ──────────────────────────────────────────────────────────────────

class CollageApp {
    constructor() {
        // State
        this.currentLayout = null;
        this.tiles       = [];   // {x, y, w, h} in OUTPUT coordinates
        this.tileImages  = {};   // index → {file, objectUrl, serverFilename}
        this.dividers    = [];   // from layout definition
        this.outputWidth  = DEFAULT_WIDTH;
        this.outputHeight = DEFAULT_HEIGHT;

        // DOM
        this.canvasEl      = document.getElementById('canvas');
        this.canvasWrapper = document.getElementById('canvas-wrapper');
        this.emptyStateEl  = document.getElementById('empty-state');
        this.exportBtn     = document.getElementById('export-btn');
        this.resetBtn      = document.getElementById('reset-btn');
        this.widthInput    = document.getElementById('output-w');
        this.heightInput   = document.getElementById('output-h');
        this.fileInput     = document.getElementById('file-input');
        this.layoutGrid    = document.getElementById('layout-grid');

        // Rendered elements
        this.tileElements    = [];
        this.dividerElements = [];

        // Interaction state
        this.activeTileIndex  = null; // which tile triggered file picker
        this.draggingDivider  = null;
        this.dragStartPos     = null;

        this.init();
    }

    // ── Initialisation ──────────────────────────────────────────

    init() {
        this.buildLayoutCards();
        this.setupEvents();
        this.updateCanvasSize();
    }

    buildLayoutCards() {
        for (const [key, layout] of Object.entries(LAYOUTS)) {
            const card = document.createElement('div');
            card.className = 'layout-card';
            card.dataset.layout = key;
            card.innerHTML = `
                <div class="layout-preview">${layout.previewSVG}</div>
                <span class="layout-name">${layout.name}</span>`;
            card.addEventListener('click', () => this.selectLayout(key));
            this.layoutGrid.appendChild(card);
        }
    }

    setupEvents() {
        // Size inputs
        const onSizeInput = () => {
            this.outputWidth  = Math.max(100, parseInt(this.widthInput.value)  || 1080);
            this.outputHeight = Math.max(100, parseInt(this.heightInput.value) || 1920);
            this.onSizeChange();
        };
        this.widthInput.addEventListener('change', onSizeInput);
        this.heightInput.addEventListener('change', onSizeInput);

        // Presets
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.outputWidth  = parseInt(btn.dataset.w);
                this.outputHeight = parseInt(btn.dataset.h);
                this.widthInput.value  = this.outputWidth;
                this.heightInput.value = this.outputHeight;
                this.onSizeChange();
            });
        });

        // File picker result
        this.fileInput.addEventListener('change', e => {
            if (e.target.files.length > 0 && this.activeTileIndex !== null) {
                this.uploadImage(this.activeTileIndex, e.target.files[0]);
            }
            e.target.value = '';
        });

        // Buttons
        this.exportBtn.addEventListener('click', () => this.exportCollage());
        this.resetBtn.addEventListener('click',  () => this.reset());

        // Window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.render(), 60);
        });

        // Divider drag (document-level)
        document.addEventListener('mousemove', e => this.onDividerDrag(e));
        document.addEventListener('mouseup',   () => this.onDividerDragEnd());

        // Also handle touch for mobile
        document.addEventListener('touchmove', e => {
            if (this.draggingDivider !== null) {
                e.preventDefault();
                const touch = e.touches[0];
                this.onDividerDrag(touch);
            }
        }, { passive: false });
        document.addEventListener('touchend', () => this.onDividerDragEnd());
    }

    // ── Layout selection ────────────────────────────────────────

    selectLayout(layoutName) {
        this.currentLayout = layoutName;

        // Keep any images that still fit the new tile count; clear extras
        const layout = LAYOUTS[layoutName];
        const newImages = {};
        for (let i = 0; i < layout.tileCount; i++) {
            if (this.tileImages[i]) newImages[i] = this.tileImages[i];
        }
        // Revoke extras
        for (const key of Object.keys(this.tileImages)) {
            if (!(key in newImages)) {
                URL.revokeObjectURL(this.tileImages[key].objectUrl);
            }
        }
        this.tileImages = newImages;

        // Update active card
        document.querySelectorAll('.layout-card').forEach(card => {
            card.classList.toggle('active', card.dataset.layout === layoutName);
        });

        // Generate tiles & dividers
        this.tiles    = layout.generateTiles(this.outputWidth, this.outputHeight);
        this.dividers = layout.getDividers();

        this.render();
        this.updateExportButton();
    }

    onSizeChange() {
        if (this.currentLayout) {
            const layout = LAYOUTS[this.currentLayout];
            this.tiles    = layout.generateTiles(this.outputWidth, this.outputHeight);
            this.dividers = layout.getDividers();
            this.render();
        } else {
            this.updateCanvasSize();
        }
    }

    // ── Canvas sizing (maintains output aspect ratio) ───────────

    getCanvasSize() {
        const maxW = this.canvasWrapper.clientWidth  - 48;
        const maxH = this.canvasWrapper.clientHeight - 48;
        const aspect = this.outputWidth / this.outputHeight;

        let w, h;
        if (maxW / maxH > aspect) {
            h = Math.min(maxH, 900);
            w = h * aspect;
        } else {
            w = Math.min(maxW, 900);
            h = w / aspect;
        }
        // Guarantee positive values
        w = Math.max(w, 60);
        h = Math.max(h, 60);
        return { w: Math.floor(w), h: Math.floor(h) };
    }

    updateCanvasSize() {
        const { w, h } = this.getCanvasSize();
        this.canvasEl.style.width  = w + 'px';
        this.canvasEl.style.height = h + 'px';
    }

    // ── Coordinate mapping ──────────────────────────────────────

    toPreview(ox, oy, ow, oh) {
        const c = this.getCanvasSize();
        const sx = c.w / this.outputWidth;
        const sy = c.h / this.outputHeight;
        return {
            x: Math.round(ox * sx),
            y: Math.round(oy * sy),
            w: Math.round(ow * sx),
            h: Math.round(oh * sy),
        };
    }

    // ── Full render ─────────────────────────────────────────────

    render() {
        if (!this.currentLayout) return;

        this.updateCanvasSize();
        this.emptyStateEl.style.display = 'none';

        // Clear previous elements
        this.tileElements.forEach(el => el.remove());
        this.dividerElements.forEach(el => el.remove());
        this.tileElements    = [];
        this.dividerElements = [];

        // Render tiles
        this.tiles.forEach((tile, idx) => {
            const p = this.toPreview(tile.x, tile.y, tile.w, tile.h);
            const el = document.createElement('div');
            el.className = 'tile' + (this.tileImages[idx] ? ' has-image' : '');
            el.style.cssText = `left:${p.x}px;top:${p.y}px;width:${p.w}px;height:${p.h}px;`;

            // Badge
            const badge = document.createElement('div');
            badge.className = 'tile-number';
            badge.textContent = idx + 1;
            el.appendChild(badge);

            if (this.tileImages[idx]) {
                const img = document.createElement('img');
                img.src = this.tileImages[idx].objectUrl;
                img.draggable = false;
                el.appendChild(img);

                const rm = document.createElement('button');
                rm.className = 'tile-remove';
                rm.innerHTML = '&times;';
                rm.addEventListener('click', e => { e.stopPropagation(); this.removeImage(idx); });
                el.appendChild(rm);
            } else {
                const ph = document.createElement('div');
                ph.className = 'tile-placeholder';
                ph.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5"  y1="12" x2="19" y2="12"/>
                    </svg>
                    <span>Add Photo</span>`;
                el.appendChild(ph);
            }

            // Click → file picker
            el.addEventListener('click', () => {
                this.activeTileIndex = idx;
                this.fileInput.click();
            });

            // Drag-and-drop
            el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('drag-over'); });
            el.addEventListener('dragleave', ()  => el.classList.remove('drag-over'));
            el.addEventListener('drop', e => {
                e.preventDefault();
                el.classList.remove('drag-over');
                if (e.dataTransfer.files.length) this.uploadImage(idx, e.dataTransfer.files[0]);
            });

            this.canvasEl.appendChild(el);
            this.tileElements.push(el);
        });

        // Render dividers
        this.dividers.forEach((div, idx) => {
            const pos = this.getDividerPos(div);
            const el  = document.createElement('div');
            el.className = 'divider ' + (div.orientation === 'h' ? 'horizontal' : 'vertical');

            if (div.orientation === 'h') {
                el.style.cssText = `left:${pos.x}px;top:${pos.y}px;width:${pos.w}px;`;
            } else {
                el.style.cssText = `left:${pos.x}px;top:${pos.y}px;height:${pos.h}px;`;
            }

            // Mouse drag
            el.addEventListener('mousedown', e => { e.preventDefault(); this.onDividerDragStart(idx, e); });
            // Touch drag
            el.addEventListener('touchstart', e => {
                e.preventDefault();
                const touch = e.touches[0];
                this.onDividerDragStart(idx, touch);
            }, { passive: false });

            this.canvasEl.appendChild(el);
            this.dividerElements.push(el);
        });
    }

    // ── Divider position (computed from current tiles) ──────────

    getDividerPos(divider) {
        const all = [...divider.tilesA, ...divider.tilesB].map(i => this.tiles[i]);

        if (divider.orientation === 'h') {
            const ref = this.tiles[divider.tilesA[0]];
            const y   = ref.y + ref.h;
            const x   = Math.min(...all.map(t => t.x));
            const maxX = Math.max(...all.map(t => t.x + t.w));
            const pv  = this.toPreview(x, y, maxX - x, 0);
            return { x: pv.x, y: pv.y, w: pv.w };
        } else {
            const ref = this.tiles[divider.tilesA[0]];
            const x   = ref.x + ref.w;
            const y   = Math.min(...all.map(t => t.y));
            const maxY = Math.max(...all.map(t => t.y + t.h));
            const pv  = this.toPreview(x, y, 0, maxY - y);
            return { x: pv.x, y: pv.y, h: pv.h };
        }
    }

    // ── Divider dragging ────────────────────────────────────────

    onDividerDragStart(index, event) {
        this.draggingDivider = index;
        this.dragStartPos = { x: event.clientX, y: event.clientY };
        if (this.dividerElements[index]) {
            this.dividerElements[index].classList.add('dragging');
        }
        document.body.style.cursor =
            this.dividers[index].orientation === 'h' ? 'row-resize' : 'col-resize';
        document.body.style.userSelect = 'none';
    }

    onDividerDrag(event) {
        if (this.draggingDivider === null) return;

        const divider = this.dividers[this.draggingDivider];
        const canvas  = this.getCanvasSize();
        const MIN     = 40; // minimum tile dimension in output px

        if (divider.orientation === 'h') {
            const dy = event.clientY - this.dragStartPos.y;
            const dyOut = Math.round(dy * (this.outputHeight / canvas.h));
            if (dyOut === 0) return;

            // Validate
            for (const i of divider.tilesA) if (this.tiles[i].h + dyOut < MIN) return;
            for (const i of divider.tilesB) if (this.tiles[i].h - dyOut < MIN) return;

            // Apply
            for (const i of divider.tilesA) this.tiles[i].h += dyOut;
            for (const i of divider.tilesB) { this.tiles[i].y += dyOut; this.tiles[i].h -= dyOut; }

        } else {
            const dx = event.clientX - this.dragStartPos.x;
            const dxOut = Math.round(dx * (this.outputWidth / canvas.w));
            if (dxOut === 0) return;

            for (const i of divider.tilesA) if (this.tiles[i].w + dxOut < MIN) return;
            for (const i of divider.tilesB) if (this.tiles[i].w - dxOut < MIN) return;

            for (const i of divider.tilesA) this.tiles[i].w += dxOut;
            for (const i of divider.tilesB) { this.tiles[i].x += dxOut; this.tiles[i].w -= dxOut; }
        }

        this.dragStartPos = { x: event.clientX, y: event.clientY };
        this.render();
    }

    onDividerDragEnd() {
        if (this.draggingDivider !== null) {
            if (this.dividerElements[this.draggingDivider]) {
                this.dividerElements[this.draggingDivider].classList.remove('dragging');
            }
            this.draggingDivider = null;
            this.dragStartPos    = null;
            document.body.style.cursor     = '';
            document.body.style.userSelect = '';
        }
    }

    // ── Image upload ────────────────────────────────────────────

    async uploadImage(tileIndex, file) {
        if (!file || !file.type.startsWith('image/')) {
            this.showToast('Please select a valid image file', 'error');
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        const formData  = new FormData();
        formData.append('image', file);

        try {
            const resp = await fetch('/api/upload', { method: 'POST', body: formData });
            if (!resp.ok) {
                const err = await resp.json().catch(() => ({}));
                throw new Error(err.error || 'Upload failed');
            }
            const data = await resp.json();

            // Revoke previous URL if replacing
            if (this.tileImages[tileIndex]) {
                URL.revokeObjectURL(this.tileImages[tileIndex].objectUrl);
            }

            this.tileImages[tileIndex] = {
                file,
                objectUrl,
                serverFilename: data.filename,
            };

            this.render();
            this.updateExportButton();
        } catch (err) {
            URL.revokeObjectURL(objectUrl);
            this.showToast('Failed to upload image: ' + err.message, 'error');
            console.error(err);
        }
    }

    removeImage(index) {
        if (this.tileImages[index]) {
            URL.revokeObjectURL(this.tileImages[index].objectUrl);
            delete this.tileImages[index];
            this.render();
            this.updateExportButton();
        }
    }

    // ── Export ───────────────────────────────────────────────────

    updateExportButton() {
        const allFilled = this.tiles.length > 0 &&
            this.tiles.every((_, i) => this.tileImages[i]);
        this.exportBtn.disabled = !allFilled;
    }

    async exportCollage() {
        if (!this.currentLayout) return;

        const images    = [];
        const positions = [];

        for (let i = 0; i < this.tiles.length; i++) {
            if (!this.tileImages[i]) {
                this.showToast('Please add images to all tiles first', 'error');
                return;
            }
            images.push(this.tileImages[i].serverFilename);
            const t = this.tiles[i];
            positions.push([t.x, t.y, t.w, t.h]);
        }

        this.showLoading(true);

        try {
            const resp = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    layout:    this.currentLayout,
                    images,
                    positions,
                    width:     this.outputWidth,
                    height:    this.outputHeight,
                }),
            });

            if (!resp.ok) {
                const err = await resp.json().catch(() => ({}));
                throw new Error(err.error || 'Generation failed');
            }

            const blob = await resp.blob();
            const url  = URL.createObjectURL(blob);
            const a    = document.createElement('a');
            a.href     = url;
            a.download = 'collage.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showToast('Collage exported successfully!', 'success');
        } catch (err) {
            this.showToast('Export failed: ' + err.message, 'error');
            console.error(err);
        } finally {
            this.showLoading(false);
        }
    }

    // ── Reset ───────────────────────────────────────────────────

    reset() {
        for (const key of Object.keys(this.tileImages)) {
            URL.revokeObjectURL(this.tileImages[key].objectUrl);
        }
        this.currentLayout = null;
        this.tiles      = [];
        this.tileImages = {};
        this.dividers   = [];

        document.querySelectorAll('.layout-card').forEach(c => c.classList.remove('active'));

        this.tileElements.forEach(el => el.remove());
        this.dividerElements.forEach(el => el.remove());
        this.tileElements    = [];
        this.dividerElements = [];

        this.emptyStateEl.style.display = '';
        this.updateCanvasSize();
        this.updateExportButton();
    }

    // ── Helpers ─────────────────────────────────────────────────

    showLoading(show) {
        let overlay = document.querySelector('.loading-overlay');
        if (show && !overlay) {
            overlay = document.createElement('div');
            overlay.className = 'loading-overlay';
            overlay.innerHTML = '<div class="loading-spinner"></div>';
            document.body.appendChild(overlay);
        } else if (!show && overlay) {
            overlay.remove();
        }
    }

    showToast(message, type = '') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast' + (type ? ` ${type}` : '');
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 3500);
    }
}


// ──────────────────────────────────────────────────────────────────
// BOOT
// ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    window.collageApp = new CollageApp();
});