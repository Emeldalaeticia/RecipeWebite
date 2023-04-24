const searchForm = document.querySelector("form");
const searchBtn = document.querySelector("search-btn")
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "b8afee35";
const APP_key = "89f88aed58fc484cf483373429601916";
// console.log(container)
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});




async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
 generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results){
  container.classList.remove("initial");
  let generatedHTML = '';
  results.map(result => {
    generatedHTML += 
    `
      <div class="item">
        <img src="${result.recipe.image}" alt="">
      <div class="flex-container">
        <h1 class="title"> ${result.recipe.label}</h1>
        <a class="view-btn" target="_blank" href="${
          result.recipe.url
        }">View Recipe</a>
      </div>
      <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
      <p class="item-data">Dish Type: ${result.recipe.dishType}</p>
      <p class="item-data">Cuisine Type: ${result.recipe.cuisineType}</p>
    </div>
  `;
});

  searchResultDiv.innerHTML = generatedHTML;
}