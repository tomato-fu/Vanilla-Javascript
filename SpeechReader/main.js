const boxContainer = document.querySelector(".text-box-container");
const mask = document.querySelector(".mask");
const closeBtn = document.querySelector(".close");
const textBtn = document.querySelector(".text-btn");
const voicesSelect = document.getElementById("voices");
const readBtn = document.getElementById("read");
const textArea = document.getElementById("text");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];
createBoxes();

function createBoxes() {
  data.forEach((item) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
    <img src="${item.image}" alt="${item.text}" />
    <div class="box-btn">${item.text}</div>`;
    box.addEventListener("click", () => {
      setMessage(item.text);
      speakText();
      box.classList.add("active");
      setTimeout(() => box.classList.remove("active"), 800);
    });

    boxContainer.appendChild(box);
  });
}
let voices = [];

const message = new SpeechSynthesisUtterance();

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

function speakText() {
  speechSynthesis.speak(message);
}

function setMessage(text) {
  message.text = text;
}

function setVoices(e) {
  //console.log(e.target.value);
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

getVoices();

closeBtn.addEventListener("click", () => {
  mask.classList.remove("show");
});

textBtn.addEventListener("click", () => {
  mask.classList.add("show");
});

speechSynthesis.addEventListener("voiceschanged", getVoices);

readBtn.addEventListener("click", () => {
  setMessage(textArea.value);
  speakText();
});

voicesSelect.addEventListener("change", setVoices);
