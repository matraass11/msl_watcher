function syncOverlays() {
    const video = document.querySelector('video');
    const player = document.querySelector('#movie_player');
    
    if (!video || !player) return requestAnimationFrame(syncOverlays);

    const boxIds = ['yt-overlay-1', 'yt-overlay-2', 'yt-overlay-3'];

    boxIds.forEach(id => {
        let box = document.getElementById(id);
        
        // Create box if it doesn't exist
        if (!box) {
            box = document.createElement('div');
            box.id = id;
            box.className = 'yt-overlay-box';
            // We attach directly to the body to avoid YouTube's 
            // internal "z-index" and "sandboxing" issues
            document.body.appendChild(box);
        }

        // Get the EXACT coordinates of the video pixels
        const rect = video.getBoundingClientRect();

        // Map your percentages to the video's current real-time pixels
        if (id === 'yt-overlay-1') {
            updateStyle(box, rect, 7, 5, 33, 7);
        } else if (id === 'yt-overlay-2') {
            updateStyle(box, rect, 12, 5, 10, 30);
        } else if (id === 'yt-overlay-3') {
            updateStyle(box, rect, 79, 10, 88, 15);
        }
    });

    requestAnimationFrame(syncOverlays);
}

function updateStyle(box, rect, topPct, leftPct, widthPct, heightPct) {
    box.style.top = `${rect.top + (rect.height * topPct / 100)}px`;
    box.style.left = `${rect.left + (rect.width * leftPct / 100)}px`;
    box.style.width = `${rect.width * widthPct / 100}px`;
    box.style.height = `${rect.height * heightPct / 100}px`;
}

syncOverlays();