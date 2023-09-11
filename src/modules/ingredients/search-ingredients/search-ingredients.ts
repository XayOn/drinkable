import { EventAggregator } from "aurelia-event-aggregator";
import { inject } from "aurelia-framework";
import { Ingredient } from "domain/entities/ingredient";
import { Tap } from "domain/entities/tap";
import { IngredientService } from "services/ingredient-service";
import { LocalStorageService } from "services/local-storage-service";

@inject(EventAggregator, LocalStorageService, IngredientService)
export class SearchIngredients {
  public selectedIngredients: Ingredient[] = [];
  public ingredients: Ingredient[] = [];

  private _activeIngredientIds: string[] = [];

  // TODO: Fix this type
  private _configuredTaps: { [key: number]: number } = [];

  constructor(
    private _eventAggregator: EventAggregator,
    private _localStorageService: LocalStorageService,
    private _ingredientService: IngredientService,
  ) {}

  bind() {
    this.ingredients = this._ingredientService.getIngredients();
    this._activeIngredientIds = this._localStorageService.getIngredientIds();
    this._configuredTaps = this._localStorageService.getTaps();
    this._updateTabs();

    this.selectedIngredients = this.ingredients.filter((x) =>
      this._activeIngredientIds.includes(x.id)
    );
  }

  private _updateTabs() {
    this.ingredients = this.ingredients.map((x) => {
      x.tapNumber = this._configuredTaps[x.id];
      return x;
    });
  }
  async setTap(item: Ingredient, event) {
    console.log(`Value of ${item.id} changed to: ${event.target.value}`);
    this._configuredTaps[item.id] = event.target.value;
    await this._localStorageService.updateConfiguredTaps(this._configuredTaps);
  }

  closeIngredientSearch() {
    this._eventAggregator.publish("navigation-fixed-position", false);
  }

  async addItem(ingredient: Ingredient) {
    this._activeIngredientIds.push(ingredient.id);
    await this._localStorageService.updateSavedIngredients(
      this._activeIngredientIds,
    );
  }

  public tapForItem(ingredient: Ingredient): Tap {
    return this._localStorageService.getTapForItem(ingredient);
  }

  async removeItem(ingredient: Ingredient) {
    this.selectedIngredients = this.selectedIngredients.filter((x) =>
      x.id !== ingredient.id
    );

    this._activeIngredientIds = this._activeIngredientIds.filter((x) =>
      x !== ingredient.id
    );

    await this._localStorageService.updateSavedIngredients(
      this._activeIngredientIds,
    );
  }
}
