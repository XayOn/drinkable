import { inject } from "aurelia-framework";
import { LocalStorageService } from "./local-storage-service";
import { CapacitorHttp } from "@capacitor/core";

@inject(LocalStorageService)
export class CocktailMakerService {
  private _cocktailMakerSettings: { [key: string]: string } = {};

  constructor(private _localStorageService: LocalStorageService) {
  }

  public settings() {
    return this._localStorageService.getCocktailMakerSettings();
  }

  public async setSettings(settings) {
    const resp = await CapacitorHttp.get({"url": settings.apiUrl + "/setup/app_settings?code=" + settings.code});
    let _settings = await resp.data;
    _settings["apiUrl"] = settings.apiUrl;

    await this._localStorageService.setCocktailMakerSettings(_settings);
    return _settings;
  }

}
