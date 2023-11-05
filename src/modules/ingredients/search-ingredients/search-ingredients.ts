import { EventAggregator } from 'aurelia-event-aggregator';
import { SetupTapnumber } from 'components/dialogs/setup-tapnumber/setup-tapnumber';
import { DialogService } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { Ingredient } from 'domain/entities/ingredient';
import { Tap } from 'domain/entities/tap';
import { IngredientService } from 'services/ingredient-service';
import { LocalStorageService } from 'services/local-storage-service';

@inject(EventAggregator, LocalStorageService, IngredientService, DialogService)
export class SearchIngredients {
    public selectedIngredients: Ingredient[] = [];
    public ingredients: Ingredient[] = [];

    private _activeIngredientIds: string[] = [];

    // TODO: Fix this type
    private _configuredTaps: { [key: number]: number } = [];
    public isMixologySetup: boolean = false;

    public colors = {
        0: 'disabled',
        None: 'disabled',
        1: 'red',
        2: 'yellow',
        3: 'green',
        4: 'black',
        5: 'blue',
        6: 'white'
    };

    constructor(
        private _eventAggregator: EventAggregator,
        private _localStorageService: LocalStorageService,
        private _ingredientService: IngredientService,
        private _dialogService: DialogService
    ) {
        const conf = this._localStorageService.getCocktailMakerSettings();
        this.isMixologySetup = conf && conf.apiUrl && conf.apiKey && conf.apiToken ? true : false;
        console.log(conf);
        console.log(this.isMixologySetup);
    }

    openTapNumberDialog(ingredient: Ingredient) {
        this._dialogService
            .open({ viewModel: SetupTapnumber, model: { selectedColor: ingredient.tapNumber } })
            .whenClosed(response => {
                if (!response.wasCancelled) {
                    this.setTap(ingredient, response.output);
                    ingredient.tapNumber = response.output;
                }
            });
    }

    bind() {
        this.ingredients = this._ingredientService.getIngredients();
        this._activeIngredientIds = this._localStorageService.getIngredientIds();
        this._configuredTaps = this._localStorageService.getTaps();
        this._updateTabs();

        this.selectedIngredients = this.ingredients.filter(x => this._activeIngredientIds.includes(x.id));
    }

    private _updateTabs() {
        this.ingredients = this.ingredients.map(x => {
            x.tapNumber = this._configuredTaps[x.id];
            return x;
        });
    }
    async setTap(item: Ingredient, tapNumber: number) {
        console.log(`Value of ${item.id} changed to: ${tapNumber}`);
        let hasChanges = false;
        for (const key in this._configuredTaps) {
            if (this._configuredTaps[key] == tapNumber) {
                console.log('Replacing key', key);
                this._configuredTaps[key] = 0;
                hasChanges = true;
            }
        }
        this._configuredTaps[item.id] = tapNumber;
        if (hasChanges) {
            this._configuredTaps = { ...this._configuredTaps };
            this.selectedIngredients = this.selectedIngredients.map(x => {
                x.tapNumber = this._configuredTaps[x.id];
                return x;
            });
        }
        await this._localStorageService.updateConfiguredTaps(this._configuredTaps);
        this._configuredTaps = this._localStorageService.getTaps();
        console.log('Final', this._configuredTaps);
    }

    closeIngredientSearch() {
        this._eventAggregator.publish('navigation-fixed-position', false);
    }

    async addItem(ingredient: Ingredient) {
        this._activeIngredientIds.push(ingredient.id);
        await this._localStorageService.updateSavedIngredients(this._activeIngredientIds);
    }

    public tapForItem(ingredient: Ingredient): Tap {
        return this._localStorageService.getTapForItem(ingredient);
    }

    async removeItem(ingredient: Ingredient) {
        this.selectedIngredients = this.selectedIngredients.filter(x => x.id !== ingredient.id);

        this._activeIngredientIds = this._activeIngredientIds.filter(x => x !== ingredient.id);

        await this._localStorageService.updateSavedIngredients(this._activeIngredientIds);
    }
}
