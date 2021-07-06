const settingBtn = document.querySelector(".setting-btn");
const setting = document.querySelector(".settings");
const settingForm = document.getElementById("setting-form");
const time = document.getElementById("time");
const level = document.getElementById("level");
const score = document.getElementById("score");
const word = document.getElementById("word");
const text = document.getElementById("text");
const container = document.querySelector(".container");

let words = ["juice", "apple", "baby", "mon", "food"];
let totalTime = 10;
let scores = 0;
let diffculty =
  localStorage.getItem("diffculty") === null
    ? "easy"
    : localStorage.getItem("diffculty");

level.value =
  localStorage.getItem("diffculty") === null
    ? "easy"
    : localStorage.getItem("diffculty");
console.log(diffculty);
text.focus();

const interval = setInterval(updateTimer, 1000);

//set word

setWord();

function setWord() {
  word.innerText = getRandomWord();
}

function updateTimer() {
  totalTime--;
  time.textContent = `Time left ${totalTime}`;
  if (totalTime === 0) {
    clearInterval(interval);
    over();
  }
}

function over() {
  container.innerHTML = `<h1>Time ran out</h1>
    <h3>Your final score is ${scores}</h3>
    <button class='try-Btn' onclick='location.reload()'>Try again</button>`;
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function gainScore() {
  scores++;
  score.innerText = `Score ${scores}`;
}

settingBtn.addEventListener("click", () => {
  setting.classList.toggle("hidden");
});

text.addEventListener("input", () => {
  if (text.value === word.innerText) {
    if (diffculty === "easy") totalTime += 3;
    if (diffculty === "medium") totalTime += 2;
    if (diffculty === "hard") totalTime += 1;

    gainScore();
    text.value = "";
    setWord();
    updateTimer();
  }
});

settingForm.addEventListener("change", (e) => {
  //console.log(e.target.value);
  diffculty = e.target.value;
  localStorage.setItem("diffculty", diffculty);
  location.reload();
});
