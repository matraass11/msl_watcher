let currentMode = 1;

const getActiveKeyMap = () => {
    const map = {};

    const formatKey = (val) => {
        if (!val) return null; 
        const str = String(val).toUpperCase();
        // Detect if it's a number (Digit) or a letter (Key)
        return /^\d$/.test(str) ? `Digit${str}` : `Key${str}`;
    };

    const k1 = formatKey(APP_SETTINGS.keys.mode1);
    const k2 = formatKey(APP_SETTINGS.keys.mode2);
    const k3 = formatKey(APP_SETTINGS.keys.mode3);

    if (k1) map[k1] = 1;
    if (k2) map[k2] = 2;
    if (k3) map[k3] = 3;
    
    return map;
};

function syncOverlays() {
    const video = document.querySelector('video');
    if (!video) return requestAnimationFrame(syncOverlays);

    const rect = video.getBoundingClientRect();
    const activeOverlays = OVERLAY_COORDS[currentMode];

    // Remove boxes not in the current layout
    const activeIds = Object.keys(activeOverlays);
    document.querySelectorAll('.yt-overlay-box').forEach(box => {
        if (!activeIds.includes(box.id)) box.remove();
    });

    // Create and position boxes
    for (const [id, config] of Object.entries(activeOverlays)) {
        let box = document.getElementById(id);
        if (!box) {
            box = document.createElement('div');
            box.id = id;
            box.className = 'yt-overlay-box';
            document.body.appendChild(box);
        }

        // Apply dynamic color from settings
        box.style.backgroundColor = (currentMode === 2) 
            ? APP_SETTINGS.colors.night 
            : APP_SETTINGS.colors.day;

        const widthPct = config.xEnd - config.xStart;
        const heightPct = config.yEnd - config.yStart;

        box.style.left = `${rect.left + (rect.width * config.xStart / 100)}px`;
        box.style.top = `${rect.top + (rect.height * config.yStart / 100)}px`;
        box.style.width = `${rect.width * widthPct / 100}px`;
        box.style.height = `${rect.height * heightPct / 100}px`;
    }

    // Force Mute in Mode 2
    if (currentMode === 2 && !video.muted) video.muted = true;
    if (currentMode != 2 && video.muted) video.muted = false;

    requestAnimationFrame(syncOverlays);
}

window.addEventListener('keydown', (e) => {
    const keyMap = getActiveKeyMap();
    if (e.altKey && keyMap[e.code]) {
        e.preventDefault();
        e.stopPropagation();
        
        currentMode = keyMap[e.code];
        
        // UI Refresh
        document.querySelectorAll('.yt-overlay-box').forEach(el => el.remove());
        console.log(`Switched to Mode ${currentMode}`);
    }
}, true);

syncOverlays();