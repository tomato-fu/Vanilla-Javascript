const movieSelect = document.getElementById("movies-select");
const count = document.getElementById("count");
const total = document.getElementById("total");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const container = document.querySelector(".screen-container");

OldSeatUi();

function setData(movieIndex, moviePrice) {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
}
function update() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  let seatsCount = selectedSeats.length;
  let seatsTotal = seatsCount * movieSelect.value;

  count.innerHTML = seatsCount;
  total.innerHTML = seatsTotal;

  setData(movieSelect.selectedIndex, movieSelect.value);
}

function OldSeatUi() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  movieSelect.selectedIndex = localStorage.getItem("movieIndex");
  update();
}

movieSelect.addEventListener("change", (e) => {
  update();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  update();
});
