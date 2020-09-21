let title = document.querySelector('.title');
let singer = document.querySelector('.singer');
let img = document.querySelector('img');
let playpause = document.querySelector('.playpause');
let audio = document.querySelector('audio');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let current_duration = document.querySelector('.current_duration');
let total_duration = document.querySelector('.total_duration');
let progress_duration = document.querySelector('.progress_duration');
const progress_div = document.querySelector('.progress');
let isPlaying = false;
currentSong = 0;

const music = [
    {
        title : 'Samajh Mein Aaya Kya',
        singer : 'Emiway Bantai',
        img : 'https://ajinkya-chitale.github.io/Images.github.io/music_img3.jpg',
        src : 'Samajh_Mein_Aaya_Kya.mp3'
    },
    {
        title : 'Welcome to my life',
        singer : 'Chris Brown',
        img : 'https://ajinkya-chitale.github.io/Images.github.io/music_img1.jpg',
        src : 'Chris_Brown.mp3'
    },
    {
        title : 'Meri Bheegi Bheegi Si',
        singer : 'Kishor Kumar',
        img : 'https://ajinkya-chitale.github.io/Images.github.io/music_img2.jpg',
        src : 'Meri_Bheegi_Bheegi_Si.mp3'
    },
    {
        title : 'Machayenge',
        singer : 'Emiway Bantai',
        img : 'https://ajinkya-chitale.github.io/Images.github.io/music_img4.jpg',
        src : 'Emiway_Bantai.mp3'
    }
]

const play = () => {
    isPlaying = true;
    audio.play();
    img.classList.add("img_disco");
    playpause.classList.replace("fa-play", "fa-pause");
}

const stop = () => {
    isPlaying = false;
    audio.pause();
    img.classList.remove("img_disco");
    playpause.classList.replace("fa-pause", "fa-play");
}

playpause.addEventListener("click", () => {
    isPlaying ? stop() : play();
})

const renderData = () => {
    img.src = music[currentSong].img;
    audio.src = `https://ajinkya-chitale.github.io/Images.github.io/${music[currentSong].src}`;
    title.textContent = music[currentSong].title;
    singer.textContent = music[currentSong].singer;
}

const nextSong = () => {
    currentSong++;
    if(currentSong > music.length - 1) {
        currentSong = 0;
    }
    renderData();
    play();
}

const prevSong = () => {
    currentSong--;
    if(currentSong < 0) {
        currentSong = music.length - 1;
    }
    renderData();
    play();
}

audio.addEventListener("timeupdate", (event) => {
    // console.log(event);
    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress_duration.style.width = `${progress_time}%`;
    
    // Total Music Duration Update
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    if(duration) {
        total_duration.textContent = `${min_duration}:${sec_duration}`;
    }

    // Current Music Duration Update
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if(sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }
    current_duration.textContent = `${min_currentTime}:${sec_currentTime}`;
})

// increase the progress of song on click

progress_div.addEventListener("click", (event) => {
    const {duration} = audio;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    audio.currentTime = move_progress;
    // console.log(duration);
})

// If song end then move to next songs
audio.addEventListener("ended", nextSong);
 
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);