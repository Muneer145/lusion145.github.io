/*
export const add=(a, b)=> a+ b;
export const multiply= (a,b)=>(a * b);
export const ID=25;
*/
import { elements } from './base';


// we are exporting the getInput function which gets results from the input form in the ui
//arrow functions without parameters do not need to use return 
export const getInput = () => elements.searchInput.value;
//its cleaner to add curly braces since we are not returning anything
export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults = () => {
    elements.searchResultList.innerHTML = "";
    //clear buttons after clicking
    elements.searchResPages.innerHTML="";
}


const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        //shorten title to 17 character limit reduce is the callback
        title.split(" ").reduce((acc, cur) => {
            //if the acc and the current legnth is less than the limitpiush it to the new title array 
            if (acc + cur.length <= limit) {
                newTitle.push(cur)
                return acc + cur.length;
            }

        }, 0)
        //return the new result
        return `${newTitle.join(' ')}...`
    }
    return title;
}

//no export on this fucnction because we dont need it outside of searchview.js
//the rendering is actually done in the renderrecipe fucntion. renderresults just does what renderrecipe does foreach
//recipe is the var that we put in the fucntion coming from the renderecipe  called in renderresults
const renderRecipe = recipe => {
    // we input data into html
    const markup = `
   <li>
         <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
             </div>
        </a>
    </li>`;

    //adds the new li to results list.
    elements.searchResultList.insertAdjacentHTML("beforeend", markup)
}

//type:"previous" or "next"
const createButton = (page, type) =>
    //using terninary operator instead of if else statement
    `
    <button class="btn-inline results__btn--${type}" data-goto=${type === "previous" ? page - 1 : page + 1}>
      <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === "previous" ? "left" : "right"}"></use>
      </svg>
      
      <span>Page${type === "previous" ? page - 1 : page + 1}</span>
    </button>
`




//to know what buttons to display on the results we need to know the total number of results and the number of rresults to be displayed on each page
const renderButtons = (page, numOfRes, resPerPage) => {
    //math.ceil rounds to the next ceiling in case of decimal results
    const pages = Math.ceil(numOfRes / resPerPage);
    //becuase const is blocked scope and we want to be able to change the button value 
    let button;
    if (page === 1 && pages > 1) {
        //only button  should go to next page
        button = createButton(page, "next")
    } else if (page < pages) {
        //buttons should go to both previous and next
        button = `${createButton(page, "previous")}
                 ${createButton(page, "next")}
                `
    } else if (page === pages && pages > 1) {
        // only button should go to previous page 
        button = createButton(page, "previous")
    }
    elements.searchResPages.insertAdjacentHTML("afterbegin", button)
};


export const renderResults = (recipes, page = 1, resPerPage = 10) => {

    //render results of current page
    //display only 10 results per page 
    //we use page and res as shwon below so that as we move to the next page it starts from the next list of results(11 in the first instance)
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    //with arr.slice end wont go past 10 results(0 is the 1st)
    recipes.slice(start, end).forEach(renderRecipe);
    //render pagination buttons
    renderButtons(page, recipes.length, resPerPage)

}