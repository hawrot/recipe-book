import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Polish Dumplings', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Cheese', 2),
                new Ingredient('Flour Plain', 1),
            ]),
        new Recipe('Croquetas', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Serrano Ham', 1),
                new Ingredient('Milk', 10),

            ])
    ];

    getRecipes() {
        return this.recipes.slice(); //return a copy
    }
}
