let currentMode = 1;

// Utility to map Digit keys to modes
const getActiveKeyMap = () => {
    const map = {};
    map[`Digit${APP_SETTINGS.keys.mode1}`] = 1;
    map[`Digit${APP_SETTINGS.keys.mode2}`] = 2;
    map[`Digit${APP_SETTINGS.keys.mode3}`] = 3;
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
            : APP_SETTINGS.colors.standard;

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
        // Wipe boxes to allow for fresh styling/positioning
        document.querySelectorAll('.yt-overlay-box').forEach(el => el.remove());
    }
}, true);

syncOverlays();