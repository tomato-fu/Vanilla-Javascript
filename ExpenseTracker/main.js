const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("number");
const historyContainer = document.getElementById("history");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const clearBtn = document.getElementById("clear-btn");
const title = document.getElementById("title");

const historyDetails = document.getElementById("history-details");
let transactions =
  localStorage.getItem("Data") === null
    ? []
    : JSON.parse(localStorage.getItem("Data"));

initializeUI();

function generateID() {
  return Math.floor(Math.random() * 10000000);
}

function saveData(e) {
  e.preventDefault();
  let idData = generateID();
  let singData = {
    id: idData,
    text: text.value,
    amount: amount.value,
  };

  transactions.push(singData);

  const div = document.createElement("div");
  if (amount.value >= 0) {
    div.classList = "detail green";
    income.textContent = parseInt(income.textContent) + parseInt(amount.value);
    balance.textContent =
      parseInt(balance.textContent) + parseInt(amount.value);
  } else {
    div.classList = "detail red";
    expense.textContent =
      parseInt(expense.textContent) + parseInt(amount.value);
    balance.textContent =
      parseInt(balance.textContent) + parseInt(amount.value);
  }
  div.innerHTML = `<span>${text.value}</span>
  <span>${amount.value}</span>
  <button class="delete-btn" onclick="remove(${idData})">x</button>`;
  historyDetails.appendChild(div);

  localStorage.setItem("Data", JSON.stringify(transactions));

  text.value = "";
  amount.value = "";
}

function initializeUI() {
  const data = JSON.parse(localStorage.getItem("Data"));

  let incomeAmount = 0;
  let expenseAmount = 0;
  if (data !== null) {
    for (let index = 0; index < data.length; index++) {
      const div = document.createElement("div");
      const number = parseInt(data[index].amount);
      const str = data[index].text;
      const dataID = data[index].id;
      if (number >= 0) {
        div.classList = "detail green";
        incomeAmount += number;
      } else {
        div.classList = "detail red";
        expenseAmount += number;
      }
      div.innerHTML = `<span>${str}</span>
      <span>${number}</span>
      <button class="delete-btn" onclick="remove(${dataID})">x</button>`;
      historyDetails.appendChild(div);
    }
  }

  income.innerText = incomeAmount;
  expense.innerText = expenseAmount;
  balance.innerText = incomeAmount + expenseAmount;
}

function clear() {
  localStorage.clear();
  historyDetails.innerHTML = "";

  initializeUI();
}

function remove(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  localStorage.setItem("Data", JSON.stringify(transactions));
  historyDetails.innerHTML = "";
  initializeUI();
}
form.addEventListener("submit", saveData);

clearBtn.addEventListener("click", clear);
