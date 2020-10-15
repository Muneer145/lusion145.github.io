//export default "I am an export string";


import axios from "axios";
import {proxy} from '../config';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    //since its  a method, we remove the function. if it is an async function we just add async to it 
    async getResults() {
       
        //first put the api url
        try {
            //we replace query with this.query
            const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            //we remove the constant and use this.result because we want to save in the object 
            this.result = res.data.recipes
            //console.log(this.result)
        }
        //we put error as the argument so that when the promise fails, it will alert us of the reason 
        catch (error) {
            alert(error)
        }
    }
   
}






