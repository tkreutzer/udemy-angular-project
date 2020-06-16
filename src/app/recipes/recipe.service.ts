import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'This is just a test recipe',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Another Test Recipe',
      'This is just a test recipe',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',
      [new Ingredient('Bread (buns)', 2), new Ingredient('Meat', 1)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    //returns new array that is exact copy of above recipe
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(rec: Recipe) {
    this.recipes.push(rec);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRec: Recipe) {
    this.recipes[index] = newRec;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(i: number) {
    this.recipes.splice(i, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
