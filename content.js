function addOverlays() {
    const player = document.querySelector('#movie_player');

    if (player) {
        const boxIds = ['yt-overlay-1', 'yt-overlay-2', 'yt-overlay-3'];

        boxIds.forEach(id => {
            if (!player.querySelector(`#${id}`)) {
                const box = document.createElement('div');
                box.id = id;
                box.className = 'yt-overlay-box';
                player.appendChild(box);
            }
        });
    }
}

addOverlays();

const observer = new MutationObserver(() => {
    addOverlays();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});