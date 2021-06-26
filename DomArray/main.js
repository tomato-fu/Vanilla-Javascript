const main = document.getElementById("main");
const addUserBtn = document.getElementById("add");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("entire");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const info = await res.json();

  const user = info.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  data.push(newUser);
  console.log(data);
  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = "<h2 class='title'><strong>Person</strong> Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
  data.forEach((item) => {
    item.money = item.money * 2;
  });
  updateDOM();
}

function showMillion() {
  data = data.filter((item) => item.money > 1000000);
  updateDOM();
}

function sortMoney() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function calTotal() {
  const number = data.reduce((a, b) => (a += b.money), 0);
  console.log(number);
  const wealthEl = document.createElement("div");
  wealthEl.classList.add("total");
  wealthEl.innerHTML = `Total Wealth: <strong>${formatMoney(number)}</strong>`;
  main.appendChild(wealthEl);
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillion);
sortBtn.addEventListener("click", sortMoney);
calculateWealthBtn.addEventListener("click", calTotal);
