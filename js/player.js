let player;
const playerContainer = $('.player');

let eventsInit = () => {
    $('.player-start').click(e => {
        e.preventDefault();

        if (playerContainer.hasClass('paused')) {
            playerContainer.removeClass('paused');
            player.pauseVideo();
        } else {
            playerContainer.addClass('paused');
            player.playVideo();
        }
    });


$('.player-playback').click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPosition = (player.getDuration() / 100) * newButtonPositionPercent;
    $('player-playback__button').css({
        left: `${newButtonPositionPercent}`
    });

    player.seekTo(newPlaybackPosition);
 });

 $(".player__splash").click(e => {
     player.playVideo();
 });
};
//приводим время к формату минут:секунд
const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${minutes} : ${seconds}`;
};

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration(); // продолжительнсоть видео

    $('.player-estimate').text(formatTime(durationSec));

    if (typeof interval != 'undefined') {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $('.player-playback__button').css({
            left: `${completedPercent}%`
        });

        $('.player-complete').text(formatTime(completedSec));
    }, 1000); //1000 милисекунд = 1сек
};

const onPlayerStatehange = event => {
    switch (event.data) {
        case 1:
            playerContainer.addClass('active');
            playerContainer.addClass('paused');
            break;
        case 2:
            playerContainer.removeClass('active');
            playerContainer.removeClass('paused');
            break;
    }
    
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '405',
        width: '660',
        videoId: 'npj05UmnQ1Q',
        events: {
            // 'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0
        }
    });
}

eventsInit();