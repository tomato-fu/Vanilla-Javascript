const search = document.getElementById("search");
const submitBtn = document.getElementById("search-btn");
const randomBtn = document.getElementById("random");
const form = document.getElementById("form");
const mealContainer = document.getElementById("meal-container");
const title = document.getElementById("title");
const singMeal = document.getElementById("sing-meal");

function searchMeal(e) {
  singMeal.innerHTML = "";
  e.preventDefault();
  const keyWord = search.value;
  if (keyWord.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyWord}`)
      .then((res) => res.json())
      .then((data) => {
        title.textContent = `Search results for '${keyWord}'`;
        if (data.meals === null) {
          title.textContent = `There is no results for '${keyWord}'`;
        } else {
          mealContainer.innerHTML = data.meals
            .map(
              (meal) => `
              <a href='#sing-meal'>
            <div class='meal' data-mealID="${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                
                <div class="meal-info" >
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
            </a>`
            )
            .join("");
        }
      });
  } else {
    alert("Please enter a valid name!");
  }
}

function getMeal(e) {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal");
    } else {
      return false;
    }
  });
  const mealID = mealInfo.getAttribute("data-mealID");
  console.log(mealID);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      console.log(meal);
      getSingleMeal(meal);
    });
}

function getSingleMeal(meal) {
  let Ingredients = [];
  for (let index = 1; index < 21; index++) {
    let ingredient = `${meal[`strIngredient${index}`]} ${
      meal[`strMeasure${index}`]
    }`;
    if (ingredient.trim()) Ingredients.push(ingredient);
    else break;
  }
  console.log(Ingredients);

  singMeal.innerHTML = `
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
        ${Ingredients.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
  `;
}

function getRandomMeal() {
  mealContainer.innerHTML = "";
  singMeal.innerHTML = "";
  title.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      getSingleMeal(data.meals[0]);
    });
}

form.addEventListener("submit", searchMeal);
mealContainer.addEventListener("click", getMeal);
randomBtn.addEventListener("click", getRandomMeal);
