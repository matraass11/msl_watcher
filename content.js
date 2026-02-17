// CONFIGURATION: Define your boxes here using percentages (0-100)
const OVERLAYS = {
    "top-horizontal-strip": {
        xStart: 5,  xEnd: 38, // Width is 33%
        yStart: 7,  yEnd: 14  // Height is 7%
    },
    "left-vertical-strip": {
        xStart: 5,  xEnd: 15, // Width is 10%
        yStart: 12, yEnd: 42  // Height is 30%
    },
    "bottom-wide-strip": {
        xStart: 10, xEnd: 98, // Width is 88%
        yStart: 79, yEnd: 94  // Height is 15%
    }
};

function syncOverlays() {
    const video = document.querySelector('video');
    if (!video) return requestAnimationFrame(syncOverlays);

    const rect = video.getBoundingClientRect();

    // Loop through our configuration object
    for (const [id, config] of Object.entries(OVERLAYS)) {
        let box = document.getElementById(id);
        
        if (!box) {
            box = document.createElement('div');
            box.id = id;
            box.className = 'yt-overlay-box';
            document.body.appendChild(box);
        }

        // Calculate dimensions based on the Start/End points
        const widthPct = config.xEnd - config.xStart;
        const heightPct = config.yEnd - config.yStart;

        // Apply styles based on video position
        box.style.left = `${rect.left + (rect.width * config.xStart / 100)}px`;
        box.style.top = `${rect.top + (rect.height * config.yStart / 100)}px`;
        box.style.width = `${rect.width * widthPct / 100}px`;
        box.style.height = `${rect.height * heightPct / 100}px`;
    }

    requestAnimationFrame(syncOverlays);
}

syncOverlays();