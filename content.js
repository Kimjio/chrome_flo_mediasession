function findPlayCtrl() {
    if (
      !document.querySelector('.player_ct')
    ) {
      return;
    }

    if ('mediaSession' in navigator) {
        if (document.querySelector('.playbar_ct')) {
            const title = document.querySelector('.playbar_ct .track_info > .title');
            const artist = document.querySelector('.playbar_ct .track_info > .artist');
            const thumbCssUrl = document.querySelector('.playbar_ct .thumb').style.backgroundImage;
            const thumbUrlStr = thumbCssUrl.slice(5, thumbCssUrl.length -2);
            if (thumbUrlStr.length) {
                const thumbUrl = new URL(thumbUrlStr);
                const thumb = thumbUrl.origin + thumbUrl.pathname;
                
                if (!(navigator.mediaSession.metadata && navigator.mediaSession.metadata.title === title.innerText)) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: title.innerText,
                        artist: artist.innerText,
                        artwork: [
                            { src: thumb + '?/dims/resize/96x96/',   sizes: '96x96',   type: 'image/png' },
                            { src: thumb + '?/dims/resize/128x128/', sizes: '128x128', type: 'image/png' },
                            { src: thumb + '?/dims/resize/192x192/', sizes: '192x192', type: 'image/png' },
                            { src: thumb + '?/dims/resize/256x256/', sizes: '256x256', type: 'image/png' },
                            { src: thumb + '?/dims/resize/384x384/', sizes: '384x384', type: 'image/png' },
                            { src: thumb + '?/dims/resize/512x512/', sizes: '512x512', type: 'image/png' },
                        ]
                    });

                    // Flo의 재생 버튼과 동기화를 위한 play, pause 재정의
                    navigator.mediaSession.setActionHandler('play', function() {
                        document.querySelector('.icon-player.btn-player-play').click();
                    });

                    navigator.mediaSession.setActionHandler('pause', function() {
                        document.querySelector('.icon-player.btn-player-pause').click();
                    });
                    navigator.mediaSession.setActionHandler('previoustrack', function () {
                        document.querySelector('.btn-player-previous').click();
                    });

                    navigator.mediaSession.setActionHandler('nexttrack', function () {
                        document.querySelector('.btn-player-next').click();
                    });
                }
            }
        }
    }
}

(() => {
    const observer = new MutationObserver(function(mutations) {  
        findPlayCtrl();    
    });
    observer.observe(document.body, { subtree: true, attributes: true, childList: true, characterData: true });
})();
