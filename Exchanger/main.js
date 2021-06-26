const datalist = document.getElementById("browsers");
const inputOne = document.getElementById("currencyOne");
const inputTwo = document.getElementById("currencyTwo");
const rates = document.getElementById("rate");
const numberOne = document.getElementById("numberOne");
const numberTwo = document.getElementById("numberTwo");
const swap = document.getElementById("swap");

fetch("https://open.exchangerate-api.com/v6/latest")
  .then((res) => res.json())
  .then((data) => {
    console.log(Object.keys(data.rates));
    Object.keys(data.rates).forEach((currency) => {
      let option = document.createElement("option");
      option.value = currency;
      datalist.appendChild(option);
    });
    inputOne.value = "USD";
    inputTwo.value = "CNY";

    calculate();
  });

function calculate() {
  const currOne = inputOne.value;
  const currTwo = inputTwo.value;

  fetch("https://open.exchangerate-api.com/v6/latest")
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currTwo] / data.rates[currOne];
      rates.innerText = `1 ${currOne} = ${rate} ${currTwo}`;
      numberTwo.value = rate.toFixed(2);
    });
}

inputOne.addEventListener("change", calculate);
inputTwo.addEventListener("change", calculate);

numberOne.addEventListener("input", calculate);
numberTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = inputOne.value;
  inputOne.value = inputTwo.value;
  inputTwo.value = temp;

  calculate();
});
