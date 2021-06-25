const video = document.getElementById("video");
const play = document.getElementById("play");
const pause = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");
const currentStamp = document.getElementById("currentTime");

function update(e) {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.value = percent;

  let durationMin = Math.floor(duration / 60);
  let durationSec = Math.floor(duration % 60);
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);

  let currentTimeString = `${currentMin}:${currentSec}`;
  let durationString = `${durationMin}:${durationSec}`;

  currentStamp.innerHTML = currentTimeString;

  timestamp.innerHTML = durationString;
}

function updateIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

function switcher() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  updateIcon();
}
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = video.duration;

  video.currentTime = (clickX / width) * duration;
}

video.addEventListener("click", switcher);

video.addEventListener("timeupdate", update);

video.addEventListener("ended", updateIcon);

progress.addEventListener("click", setProgress);

play.addEventListener("click", switcher);
pause.addEventListener("click", () => {
  video.currentTime = 0;
  video.pause();
  updateIcon();
});
