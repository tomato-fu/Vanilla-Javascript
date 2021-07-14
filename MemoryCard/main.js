const innerCard = document.querySelector(".inner-card");
const addBtn = document.querySelector(".add-button-container");
const addContainer = document.querySelector(".add-container");
const clearBtn = document.querySelector(".clear-btn");
const quitBtn = document.getElementById("quit-btn");
const form = document.getElementById("add-form");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const left = document.getElementById("left");
const right = document.getElementById("right");
const number = document.getElementById("number");
const deleteBtn = document.getElementById("delete");

const CardContainer = document.querySelector(".card-container");
let currentCard = 0;
let data = getCardsData();
let i = 0;
// console.log(data);

if (data.length === 0) deleteBtn.classList.add("hidden");

populateUI();

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

function updatePage() {
  if (data.length > 0) number.textContent = `${currentCard + 1}/${data.length}`;
}

function populateUI() {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList = "card";
    if (i === 0) {
      div.classList.add("active");
      i++;
    }

    div.innerHTML = `<div class="inner-card">
            <div class="inner-card-front">${item.question}</div>
            <div class="inner-card-back">${item.answer}</div>
        </div>`;
    div.firstChild.addEventListener("click", () => {
      div.firstChild.classList.toggle("show");
    });
    CardContainer.appendChild(div);
    updatePage();
  });
}

function createCard() {
  const div = document.createElement("div");
  div.classList = "card";
  if (i === 0) {
    div.classList.add("active");
    i++;
  }

  div.innerHTML = `<div class="inner-card">
    <div class="inner-card-front">${question.value}</div>
    <div class="inner-card-back">${answer.value}</div>
  </div>`;
  div.firstChild.addEventListener("click", () => {
    div.firstChild.classList.toggle("show");
  });
  CardContainer.appendChild(div);
  updatePage();
}

addBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

quitBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  data.push({
    question: question.value,
    answer: answer.value,
  });
  createCard();
  answer.value = "";
  question.value = "";
  localStorage.setItem("cards", JSON.stringify(data));
  quitBtn.click();
  deleteBtn.classList.remove("hidden");
});

left.addEventListener("click", () => {
  if (currentCard > 0) {
    CardContainer.children[currentCard - 1].classList.remove("left");
    CardContainer.children[currentCard - 1].classList.add("active");
    CardContainer.children[currentCard].classList.remove("active");
    currentCard--;
    number.textContent = `${currentCard + 1}/${data.length}`;
  }
});

right.addEventListener("click", () => {
  if (currentCard < data.length - 1) {
    CardContainer.children[currentCard].classList.remove("active");
    CardContainer.children[currentCard].classList.add("left");
    CardContainer.children[currentCard + 1].classList.add("active");
    currentCard++;
    number.textContent = `${currentCard + 1}/${data.length}`;
  }
});

clearBtn.addEventListener("click", () => {
  CardContainer.innerHTML = "";
  number.textContent = "0/0";
  data = [];
  currentCard = 0;
  i = 0;
  localStorage.clear();
  deleteBtn.classList.add("hidden");
});

deleteBtn.addEventListener("click", () => {
  CardContainer.removeChild(CardContainer.childNodes[currentCard]);
  data.splice(currentCard, 1);
  //   console.log(data);
  localStorage.setItem("cards", JSON.stringify(data));
  number.textContent = `${currentCard}/${data.length}`;
  i = 0;

  if (currentCard === 0) {
    number.textContent = `${currentCard + 1}/${data.length}`;
    if (data.length === 0) number.textContent = `0/0`;
    CardContainer.children[currentCard].classList.add("active");
  }

  if (currentCard > 0) {
    CardContainer.children[currentCard - 1].classList.remove("left");
    CardContainer.children[currentCard - 1].classList.add("active");
    currentCard--;
  }
  if (data.length === 0) deleteBtn.classList.add("hidden");
});
