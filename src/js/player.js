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
    $('.player-playback__button').css({
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

const onPlayerStateChange = event => {
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
        videoId: 'HSyz0JTr82Enpm',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
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

///ВЫШЕ YOUTUBE API, НИЖЕ HTML5 API////bin

let video;
let durationControl;
let soundControl;
let intervalId;
let soundLevel;

$().ready(function() {
    video = document.getElementById("player");

    video.addEventListener('click', playStop);

    //обработчики событий для кнопок play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length; i++) {
        playButtons[i].addEventListener('click', playStop);
    }

    ////обработчики событий для кнопки динамика
    let micControl = document.getElementById("volume");
    micControl.addEventListener("click", soundOf)

    //обработчики событий для получения продолжительности видео
    durationControl = document.getElementById("durationLevel");
    durationControl.addEventListener("click", setVideoDuration);
    durationControl.addEventListener("onmousemove", setVideoDuration);
    durationControl.addEventListener("mousedown", stopInterval);
    durationControl.min = 0;
    durationControl.value = 0;

    ////обработчики событий для ползунка громкости
    soundControl = document.getElementById('micLevel');
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('onmousemove', changeSoundVolume);

    //задаем максимальные и минимальные значения громкости
    soundControl.min = 0;
    soundControl.max = 10;

    //присваиваем ползунку максимальное значение
    soundControl.value = soundControl.max;

    //обрабатываем окончание видео
    video.addEventListener('ended', function() {
        $(".video__player-img").toggleClass("video__player-img--active");
        video.currentTime = 0;
        
    }, false);

});


//воспроизведение видео
function playStop(){
    $('.video__player-img').toggleClass('video__player-img--active');

    durationControl.max = video.duration;

    //проверим стоит ли видео на паузе, если да то продолжим воспроизведение
    if (video.paused){
        video.play();
        intervalId = setInterval(updateDuration,1000/66)
        $('.duration__img').addClass('active')
    }
    else {
        video.pause();
        clearInterval(intervalId);
        $('.duration__img').removeClass('active')
    }
}

function stopInterval(){
    video.pause()
    clearInterval(intervalId);
}

//реализует возможность перемотки видео
function setVideoDuration(){
    if (video.paused){
        video.play();
    } else {
        video.pause();
    }
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration,1000/66);
}

//функция для обновления позиции ползунка продолжительности видео
function updateDuration(){
    durationControl.value = video.currentTime;
}

//управление звуком
function soundOf() {
    //делаем проверку уровня громкости, если у нашего видео есть звук, то выключаем его, 
    //предварительно запомнив текушуб позицию громкости положим ее в переменную soundLevel
    if (video.volume === 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel * 10;
    } else {
    //если у нашего видео нет звука, то выставляем то выставляем уровень громкости на 
    //прежний уровень, хранится в soundLevel
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
    }
}

//управление звуком видео
function changeSoundVolume() {
    // свойство volume может принимать значение от 0 до 1, делим на 10 для более точной
    // регулировки видео. 

video.volume = soundControl.value/10;

}