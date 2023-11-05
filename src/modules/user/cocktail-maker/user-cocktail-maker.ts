import { autoinject } from 'aurelia-framework';
import { CocktailMakerService } from 'services/cocktail-maker-service';

@autoinject
export class UserCocktailMakerSettings {
    public settings: { [key: string]: string } = {};
    public apiUrl: string = '';
    public apiKey: string = '';
    public wifis: string = '';

    constructor(private _cocktailMakerService: CocktailMakerService) {
        this._cocktailMakerService = _cocktailMakerService;
        this.settings = this.getSettings();
    }

    public async activate() {
        console.log(this.getCode());
        let new_settings = await this._cocktailMakerService.setSettings({
            apiUrl: process.env.MIXOLOGY_URL ? process.env.MIXOLOGY_URL : 'https://mixology-16df7b99e168.herokuapp.com',
            code: this.getCode()
        });
        this.wifis = new_settings.wifis;
    }

    public getCode() {
        const currentUrl = window.location.href;
        const standardUrl = currentUrl.replace('com.xayon.drinkable://', 'http://localhost/');
        const url = new URL(standardUrl);
        const searchParams = url.searchParams;
        return searchParams.get('custom_qr');
    }

    public getSettings() {
        this.settings = this._cocktailMakerService.settings();
        return this.settings;
    }
}
