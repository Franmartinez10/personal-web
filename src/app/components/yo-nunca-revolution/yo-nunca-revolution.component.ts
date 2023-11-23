import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-yo-nunca-revolution',
  templateUrl: './yo-nunca-revolution.component.html',
  styleUrls: ['./yo-nunca-revolution.component.scss'],
})
export class YoNuncaRevolutionComponent {
  pantalla: string = 'jugar'; // Pantalla por defecto: Jugar
  fraseActual: string = ''; // Frase inicial
  mostrarMenu: boolean = true;

  frases: string[] = [];

  indiceFrase: number = 0;

  constructor(
    private translateService: TranslateService,
    private router: Router,
  ) {
    this.frases = this.translateService.instant('phrases');
    this.fraseActual = this.frases[0];
  }

  mostrarPantalla(pantalla: string) {
    this.pantalla = pantalla;
  }
  exitGallery() {
    // Aquí puedes realizar acciones adicionales al salir de la galería
    this.router.navigate(['../home']); // Cambia '/home' a la ruta de tu escritorio de iPhone
  }
  checkScreenSize() {
    return window.innerWidth < 1000;
  }
  toggleMostrarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  cambiarFrase() {
    this.indiceFrase++;
    if (this.indiceFrase < this.frases.length) {
      this.fraseActual = this.frases[this.indiceFrase];
    } else {
      // Se han mostrado todas las frases, reiniciar desde el principio
      this.indiceFrase = 0;
      this.fraseActual = this.frases[this.indiceFrase];
    }
  }
}
