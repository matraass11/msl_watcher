// --- OVERLAY LAYOUT DATA ---
const OVERLAY_COORDS = {
    1: { // Mode 1: Standard Spoilers
        "top-horizontal-strip": { xStart: 1, xEnd: 50, yStart: 3, yEnd: 10 },
        "left-vertical-strip": { xStart: 1, xEnd: 15, yStart: 11, yEnd: 31 },
        "bottom-wide-strip": { xStart: 10, xEnd: 95, yStart: 79, yEnd: 99 }
    },
    2: { // Mode 2: Night Mode
        "night-left-block": { xStart: 1, xEnd: 50, yStart: 3, yEnd: 10 },
        "night-bottom-block": { xStart: 1, xEnd: 95, yStart: 11, yEnd: 99 }
    },
    3: {} // Mode 3: Clear (No coordinates)
};