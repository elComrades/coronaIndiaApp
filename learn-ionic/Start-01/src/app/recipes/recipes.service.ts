import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {
    recipes: Recipe[] = [
        {
            id: 'r1',
            title: 'Schnitzel',
            ingredients: ['French Fries', 'Pork Meat', 'Salad'],
            imageUrl: 'http://upload.wikimedia.org/wikipedia/commons/b/bc/Wiener_Schnitzel_2012.jpg'
        },
        {
            id: 'r2',
            title: 'Sphagetti',
            ingredients: ['Sphagetti', 'Meat', 'Tomatoes'],
            imageUrl: 'https://i.ytimg.com/vi/MOvD7VBOjwI/maxresdefault.jpg'
        },
    ];

    constructor() {
    }

    getAllRecipes() {
        return [...this.recipes];
    }

    getRecipe(recipeId: string) {
        return {
            ...this.recipes.find((recipe) => {
                return recipe.id === recipeId;
            }),
        };
    }

    deleteRecipe(recipeId: string) {
        this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
    }
}
