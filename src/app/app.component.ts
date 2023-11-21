import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppService } from './services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  browserLang = this.asignarCodigoIdioma(navigator.language) || 'en'; // Obtiene el idioma del navegador
  title = 'fran-martinez-torres';

  constructor(
    private deviceService: DeviceDetectorService,
    private appService: AppService,
    private router: Router,
  ) {
    this.appService.browserLang = this.browserLang;
    this.appService.chooseLanguaje();
    console.log(window.screen.width);
  }
  asignarCodigoIdioma(codigo: string): string {
    const codigoIdioma = codigo.toLowerCase();

    if (codigoIdioma.startsWith('es')) {
      return 'es-ES';
    } else if (codigoIdioma.startsWith('fr')) {
      return 'fr-FR';
    } else if (codigoIdioma.startsWith('en')) {
      return 'en-US';
    }

    // Si no coincide con ninguno de los patrones, devuelve un valor predeterminado
    return 'en-US';
  }

  ngOnInit(): void {}
}
