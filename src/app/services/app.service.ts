import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  browserLang: string = '';
  constructor(
    private translate: TranslateService,
    private deviceService: DeviceDetectorService,
  ) {}

  chooseLanguaje(lang?: string) {
    if (lang) {
      this.browserLang = lang;
    }

    if (this.browserLang.includes('es')) {
      this.translate.setDefaultLang('es');
      this.translate.use('es');
    } else if (this.browserLang.includes('fr')) {
      this.translate.setDefaultLang('fr');
      this.translate.use('fr');
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
  }
}
