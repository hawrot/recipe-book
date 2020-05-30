import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";


@Injectable()
export class RecipeService {

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

    constructor(private shoppingListService: ShoppingListService) {


    }


    getRecipes() {
        return this.recipes.slice(); //return a copy
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
}
