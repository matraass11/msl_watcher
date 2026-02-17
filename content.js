// CONFIGURATIONS (Using your exact coordinates)
const CONFIGS = {
    1: { // Mode 1: Standard Spoilers
        overlays: {
            "top-horizontal-strip": { xStart: 5, xEnd: 38, yStart: 5.5, yEnd: 10 },
            "left-vertical-strip": { xStart: 5, xEnd: 15, yStart: 12, yEnd: 31 },
            "bottom-wide-strip": { xStart: 10, xEnd: 95, yStart: 79, yEnd: 99 }
        },
        style: 'standard-style',
        mute: false
    },
    2: { // Mode 2: Night Mode
        overlays: {
            "night-left-block": { xStart: 5, xEnd: 38, yStart: 5.5, yEnd: 10 },
            "night-bottom-block": { xStart: 5, xEnd: 95, yStart: 12, yEnd: 99 }
        },
        style: 'night-style',
        mute: true
    },
    3: { // Mode 3: Clear Mode
        overlays: {},
        style: '',
        mute: false
    }
};

let currentMode = 1;

function syncOverlays() {
    const video = document.querySelector('video');
    if (!video) return requestAnimationFrame(syncOverlays);

    const rect = video.getBoundingClientRect();
    const activeConfig = CONFIGS[currentMode];

    // Cleanup: Remove boxes from other modes
    const activeIds = Object.keys(activeConfig.overlays);
    document.querySelectorAll('.yt-overlay-box').forEach(box => {
        if (!activeIds.includes(box.id)) box.remove();
    });

    // Render active boxes
    for (const [id, config] of Object.entries(activeConfig.overlays)) {
        let box = document.getElementById(id);
        
        if (!box) {
            box = document.createElement('div');
            box.id = id;
            box.className = `yt-overlay-box ${activeConfig.style}`;
            document.body.appendChild(box);
        }

        const widthPct = config.xEnd - config.xStart;
        const heightPct = config.yEnd - config.yStart;

        box.style.left = `${rect.left + (rect.width * config.xStart / 100)}px`;
        box.style.top = `${rect.top + (rect.height * config.yStart / 100)}px`;
        box.style.width = `${rect.width * widthPct / 100}px`;
        box.style.height = `${rect.height * heightPct / 100}px`;
    }

    // Mute handling
    if (activeConfig.mute && !video.muted) {
        video.muted = true;
    }

    else if (!activeConfig.mute && video.muted) {
        video.muted = false;
    }

    requestAnimationFrame(syncOverlays);
}

window.addEventListener('keydown', (e) => {
    // Mapping physical keys to mode numbers
    const keyToMode = {
        'Digit1': 1,
        'Digit2': 2,
        'Digit3': 3
    };

    // Check if Alt/Option is held AND the key pressed is 1, 2, or 3
    if (e.altKey && keyToMode[e.code]) {
        // Stop the browser from typing special characters (like ¡, ™, £)
        e.preventDefault(); 
        e.stopPropagation();

        const newMode = keyToMode[e.code];

        if (currentMode !== newMode) {
            currentMode = newMode;
            
            // Immediate cleanup of old boxes
            document.querySelectorAll('.yt-overlay-box').forEach(el => el.remove());
            
            console.log(`Switched to Mode ${currentMode} using physical key ${e.code}`);
        }
    }
}, true); // 'true' captures the event before YouTube's own keyboard shortcuts can interfere

syncOverlays();