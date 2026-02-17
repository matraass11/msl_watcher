// --- OVERLAY LAYOUT DATA ---
const OVERLAY_COORDS = {
    1: { // Mode 1: Standard Spoilers
        "top-horizontal-strip": { xStart: 5, xEnd: 38, yStart: 5.5, yEnd: 10 },
        "left-vertical-strip": { xStart: 5, xEnd: 15, yStart: 12, yEnd: 31 },
        "bottom-wide-strip": { xStart: 10, xEnd: 95, yStart: 79, yEnd: 99 }
    },
    2: { // Mode 2: Night Mode
        "night-left-block": { xStart: 5, xEnd: 38, yStart: 5.5, yEnd: 10 },
        "night-bottom-block": { xStart: 5, xEnd: 95, yStart: 12, yEnd: 99 }
    },
    3: {} // Mode 3: Clear (No coordinates)
};