const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const start = document.getElementById("currentTime");
const end = document.getElementById("duration");

//Song titles
const songs = ["ukulele", "hey", "summer"];

let songIndex = 1;

//Load song
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerHTML = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `image/${song}.jpeg`;
}

function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) songIndex = 0;

  loadSong(songs[songIndex]);
  audio.play();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;

  loadSong(songs[songIndex]);
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");

  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

function playSong() {
  musicContainer.classList.add("play");

  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function update(e) {
  //   console.log(e.srcElement.duration);
  const { duration, currentTime } = e.srcElement;
  if (isNaN(duration)) return;

  const progressPercent = (currentTime / duration) * 100;
  let durationMin = Math.floor(duration / 60);
  let durationSec = Math.floor(duration % 60);
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);

  progress.style.width = `${progressPercent}%`;

  let currentTimeString = `${currentMin}:${currentSec}`;
  let durationString = `${durationMin}:${durationSec}`;

  start.innerHTML = currentTimeString;

  end.innerHTML = durationString;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", update);
audio.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgress);
