import { autoinject } from 'aurelia-framework';
import { CocktailMakerService } from 'services/cocktail-maker-service';

@autoinject
export class UserCocktailMakerSettings {
  public settings: { [key: string]: string } = {};
  public apiUrl: string = '';
  public apiKey: string = '';
  public wifis: string = '';
  public otpInputs = [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }];

  public moveToNextInput(index: number) {
    if (this.otpInputs[index].value && index < this.otpInputs.length - 1) {
      let nextInput = document.querySelectorAll<HTMLInputElement>('.otp-inputs input')[index + 1];
      nextInput.focus();
    }
  }

  getOtpValue() {
    return this.otpInputs.map(input => input.value).join('');
  }

  constructor(private _cocktailMakerService: CocktailMakerService) {
    this._cocktailMakerService = _cocktailMakerService;
    this.settings = this.getSettings();
  }

  public getSettings() {
    this.settings = this._cocktailMakerService.settings();
    return this.settings;
  }

  public async saveSettings() {
    let new_settings = await this._cocktailMakerService.setSettings({
      apiUrl: process.env.MIXOLOGY_URL ? process.env.MIXOLOGY_URL : 'https://mixology-16df7b99e168.herokuapp.com',
      code: this.getOtpValue()
    });
    this.wifis = new_settings.wifis;
  }
}
