const list = document.getElementById("draggable-list");
const checkBtn = document.querySelector(".check-btn");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();
function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((item, index) => {
      const li_item = document.createElement("li");
      li_item.setAttribute("data-index", index);
      li_item.className = "item-container";

      li_item.innerHTML = `
      <span>${index + 1}</span>
        <div class="draggble-item" draggable="true">
          <p>${item}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(li_item);
      list.appendChild(li_item);
    });
  addEventListeners();
}

function dragStart() {
  dragStartIndex = this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add("over");
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove("over");
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = this.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggble-item");
  const itemTwo = listItems[toIndex].querySelector(".draggble-item");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggble-item");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

checkBtn.addEventListener("click", () => {
  listItems.forEach((item, index) => {
    const personName = item.querySelector(".draggble-item").textContent.trim();
    console.log(personName);
    if (personName !== richestPeople[index]) {
      item.classList.add("wrong");
      item.classList.remove("right");
    } else {
      item.classList.remove("wrong");
      item.classList.add("right");
    }
  });
});
