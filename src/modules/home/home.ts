import { inject } from 'aurelia-framework';
import { CocktailMakerService } from 'services/cocktail-maker-service';
import { LocalStorageService } from 'services/local-storage-service';
import { WidgetOrder } from 'domain/entities/widget-order';
import { Widget } from 'domain/enums/widget';
import Snowflakes from 'magic-snowflakes';

@inject(LocalStorageService, CocktailMakerService)
export class Home {
    public containerElement: HTMLElement;
    public snowflakes: Snowflakes;
    public ingredientIds: string[] = [];
    public widgetOrder: WidgetOrder[] = [];

    constructor(
        private _localStorageService: LocalStorageService,
        private _cocktailMakerService: CocktailMakerService
    ) {}

    public async setupMixologyDevice() {
        try {
            const currentUrl = window.location.href;
            const standardUrl = currentUrl.replace('com.xayon.drinkable://', 'http://localhost/');
            const url = new URL(standardUrl);
            const searchParams = url.searchParams;
            const code = searchParams.get('custom_qr');
            await this._cocktailMakerService.setSettings({
                apiUrl: process.env.MIXOLOGY_URL
                    ? process.env.MIXOLOGY_URL
                    : 'https://mixology-16df7b99e168.herokuapp.com',
                code: code
            });
        } catch (e) {
            console.log(e);
        }
    }

    async activate() {
        this.ingredientIds = this._localStorageService.getIngredientIds();
        this.widgetOrder = this._localStorageService.getWidgetOrder();
        this.setupMixologyDevice();
    }

    attached() {
        this.setupSnowflakes();
    }

    detached() {
        this.snowflakes?.destroy();
    }

    getOrderById(id: Widget) {
        const widget = this.widgetOrder.find(x => x.widgetId === id);
        if (widget !== undefined) {
            return 'order: ' + widget.order;
        }
        return 'order: ' + 0;
    }

    private setupSnowflakes() {
        if (new Date().getMonth() == 11) {
            this.snowflakes = new Snowflakes({
                count: 10,
                speed: 0.3,
                minOpacity: 0.4,
                maxOpacity: 0.7,
                minSize: 10,
                maxSize: 18,
                container: this.containerElement
            });
        }
    }
}
