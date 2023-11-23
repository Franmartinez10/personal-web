import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iphone-safari',
  templateUrl: './iphone-safari.component.html',
  styleUrls: ['./iphone-safari.component.scss'],
  animations: [
    trigger('slideUp', [
      state('void', style({ transform: 'translateY(0)' })),
      state('*', style({ transform: 'translateY(-100%)' })),
      transition('* => void', animate('300ms ease-out')),
    ]),
  ],
})
export class IphoneSafariComponent {
  @Input() url: string = '';

  constructor(private router: Router) {}

  share(): void {
    // Lógica para compartir la URL
    console.log('Compartir URL:', this.url);
  }
  exitTab() {
    // Aquí puedes realizar acciones adicionales al salir de la galería
    this.router.navigate(['../home']); // Cambia '/home' a la ruta de tu escritorio de iPhone
  }
}
