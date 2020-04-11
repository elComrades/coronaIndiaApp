import {Component, OnInit} from "@angular/core";
import {Recipe} from "./recipe.model";
import {RecipesService} from "./recipes.service";
import {LoadingController} from "@ionic/angular";

@Component({
    selector: "app-recipes",
    templateUrl: "./recipes.page.html",
    styleUrls: ["./recipes.page.scss"],
})
export class RecipesPage implements OnInit {

    recipes: Recipe[];
    isLoading = false;

    constructor(private recipesService: RecipesService,
                private loadingCtrl: LoadingController
    ) {
    }

    ngOnInit() {
        // this.recipes = this.recipesService.getAllRecipes();
    }

    load() {
        this.isLoading = true
        this.loadingCtrl.create({
            keyboardClose: true,
            message: 'Logging in...'
        }).then(loadingEl => {
            loadingEl.present();
            setTimeout(() => {
                this.isLoading = false;
                loadingEl.dismiss();
            }, 5000);
        })

    }

    ionViewWillEnter() {
        console.log("ionViewWillnter");
        this.recipes = this.recipesService.getAllRecipes();
    }

}
