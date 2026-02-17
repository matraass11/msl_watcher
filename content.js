// CONFIGURATION: Standard Spoilers
const STANDARD_OVERLAYS = {
    "top-horizontal-strip": { xStart: 5, xEnd: 38, yStart: 5.5, yEnd: 10 },
    "left-vertical-strip": { xStart: 5, xEnd: 15, yStart: 12, yEnd: 31 },
    "bottom-wide-strip": { xStart: 10, xEnd: 95, yStart: 79, yEnd: 99 }
};

// NIGHT MODE: Covers everything except the top-right corner
const NIGHT_OVERLAYS = {
    "night-left-block": { xStart: 5, xEnd: 38, yStart: 5.5, yEnd: 10 },
    "night-bottom-block": { xStart: 5, xEnd: 95, yStart: 12, yEnd: 99 }
};

let isNightMode = false;

function syncOverlays() {
    const video = document.querySelector('video');
    if (!video) return requestAnimationFrame(syncOverlays);

    const rect = video.getBoundingClientRect();
    const currentConfig = isNightMode ? NIGHT_OVERLAYS : STANDARD_OVERLAYS;

    // Remove old boxes that aren't in the current mode
    document.querySelectorAll('.yt-overlay-box').forEach(box => {
        if (!currentConfig[box.id]) box.remove();
    });

    for (const [id, config] of Object.entries(currentConfig)) {
        let box = document.getElementById(id);
        if (!box) {
            box = document.createElement('div');
            box.id = id;
            box.className = 'yt-overlay-box';
            if (isNightMode) box.classList.add('night-style');
            document.body.appendChild(box);
        }

        const widthPct = config.xEnd - config.xStart;
        const heightPct = config.yEnd - config.yStart;

        box.style.left = `${rect.left + (rect.width * config.xStart / 100)}px`;
        box.style.top = `${rect.top + (rect.height * config.yStart / 100)}px`;
        box.style.width = `${rect.width * widthPct / 100}px`;
        box.style.height = `${rect.height * heightPct / 100}px`;
    }

    // Mute Logic: Simple and effective
    video.muted = isNightMode;

    requestAnimationFrame(syncOverlays);
}

window.addEventListener('keydown', (e) => {
    // 1. Check for Alt (Option on Mac)
    // 2. Use e.code instead of e.key (e.code 'KeyN' is physical, ignores special characters)
    if (e.altKey && e.code === 'KeyN') {
        console.log("NIGHT MODE TOGGLE TRIGGERED");
        
        // Prevent the browser from trying to type a character (like ~)
        e.preventDefault(); 
        
        isNightMode = !isNightMode;
        
        // Force immediate UI cleanup
        document.querySelectorAll('.yt-overlay-box').forEach(el => el.remove());
        
        // Visual confirmation in console
        console.log("Night Mode Status:", isNightMode);
    }
}, true); // The 'true' here helps intercept the event before YouTube does

syncOverlays();