const wordContainer = document.getElementById("word");
const wrongWords = document.getElementById("wrong-words");
const figures = document.querySelectorAll(".figure-part");
const modal = document.getElementById("modal-container");
const btn = document.getElementById("confirm-btn");
const tip = document.getElementById("over-tip");
const notice = document.getElementById("notification-container");

let play = true;
let words = ["Hello", "World"];
let wordsCorrect = [];
let wordsWrong = [];
let wordSelected = words[Math.floor(Math.random() * words.length)];

loadWord();

function loadWord() {
  for (let index = 0; index < wordSelected.length; index++) {
    let span = document.createElement("span");
    span.classList.add("letter");
    wordContainer.append(span);
  }
}

function displayWord() {
  wordsCorrect.forEach((letter) => {
    for (let index = 0; index < wordSelected.length; index++) {
      if (letter == wordSelected.toLowerCase()[index]) {
        wordContainer.childNodes[index].textContent = wordSelected[index];
      }
    }
  });
  let finalWord = "";
  wordContainer.childNodes.forEach((item) => {
    finalWord += item.textContent;
  });

  if (finalWord === wordSelected) {
    tip.innerText = "You win!";
    play = false;
    modal.classList.add("show-modal");
  }
}

function displayWrongLetter() {
  if (wordsWrong.length >= 6) {
    tip.innerText = "Unfortunally you lost";
    play = false;
    modal.classList.add("show-modal");
  }
  wrongWords.innerHTML = `${wordsWrong.length > 0 ? "<p>Wrong Letters</p>" : ""}
    ${wordsWrong.map((letter) => `<span>${letter}</span>`)}`;

  for (let index = 0; index < wordsWrong.length; index++) {
    figures.item(index).style.display = "block";
  }
}
function reStart() {
  figures.forEach((item) => {
    item.style.display = "none";
  });
  wordContainer.innerHTML = "";
  wrongWords.innerHTML = "";
  modal.classList.remove("show-modal");
  wordsCorrect = [];
  wordsWrong = [];
  wordSelected = words[Math.floor(Math.random() * words.length)];
  play = true;

  loadWord();
}

function notification() {
  notice.classList.toggle("show");

  setTimeout(() => {
    notice.classList.toggle("show");
  }, 2000);
}

window.addEventListener("keydown", (e) => {
  if (play) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();
      if (wordSelected.toLowerCase().includes(letter)) {
        if (!wordsCorrect.includes(letter)) {
          wordsCorrect.push(letter);
          displayWord();
        } else notification();
      } else {
        if (!wordsWrong.includes(letter)) {
          wordsWrong.push(letter);
          displayWrongLetter();
        } else notification();
      }
    }
  }
});

btn.addEventListener("click", reStart);
