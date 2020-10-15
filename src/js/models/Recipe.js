import axios from "axios";
import {proxy} from '../config';
export default class  Recipe{
    constructor (id){
        this.id=id;
    }
    async getRecipe(){
        try{
            //wiil return a promise which we await 
            const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title=res.data.recipe.title;
            this.author=res.data.recipe.publisher;
            this.image=res.data.recipe.image_url
            this.url=res.data.recipe.source_url;
            this.ingredients=res.data.recipe.ingredients;
          
        }
        catch(error){
            console.log(error);
            alert("error :(")
        }
    }
    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        //shows us the no of ingredients(number of string literally)
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','cup','pounds'];
        const unitsShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','cup','pound'];
        const units=[...unitsShort,'kg','g'];
        //with map, every value that enters the array will be changed to what we want and saved 
        const newIngredients=this.ingredients.map(el=>{
        // 1- Uniform units 
         //the forEach method we use replaces any keyword in the unitslong array with its positional counterpart in the unitsShort array
        let ingredient=el.toLowerCase();
        unitsLong.forEach((unit,i)=>{
            ingredient=ingredient.replace(unit,unitsShort[i]);
        })

        //2-remove parenthesis from recipe ingredients
        ingredient=ingredient.replace(/ *\([^)]*\) */g, " ")

        //3- parse ingredients into count, unit and ingredients 
        //split ingredients  where there are empty spaces 
        const arrIng=ingredient.split(" ");

        //find the index where the unit is located. el2 because el has already been taken
        //this will return the index of the elements  that returns true. (if the element has oz,tbsp etc it will return true and return their index) 
        const unitIndex=arrIng.findIndex(el2=>unitsShort.includes(el2))

        //-1 means everything turns out to be false(couldnt find an element)
        let objIng;
        let count;
        if(unitIndex>-1){
             //there is a unit
             //Ex 4 1/2 cups our arrCount will be [4,1/2]--> "4+1/2"
             //Ex 4 cups our arrCount will be [4]
             const arrCount=arrIng.slice(0,unitIndex)
             if(arrCount.length===1){
                 count=eval(arrIng[0].replace('-','+'))
             }else {
                 count=eval(arrIng.slice(0,unitIndex).join('+'));
             }
             objIng={
                 count,
                 unit:arrIng[unitIndex],
                 ingredient:arrIng.slice(unitIndex+1).join(" ")
             }
        }else if(parseInt(arrIng[0],10)){
             //there is no unit but the 1st element is a number
             objIng={
                 count:parseInt(arrIng[0],10),
                 unit:'',
                 ingredient:arrIng.slice(1).join(" ")
             }

        }else if(unitIndex==-1){
            //there is no unit and no number in the first position of the arrIng
            objIng={
                count:1,
                unit:'',
                ingredient,
            }
        }

        return objIng;
        });

        this.ingredients=newIngredients;
    }
}