import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-iphone-safari',
  templateUrl: './iphone-safari.component.html',
  styleUrls: ['./iphone-safari.component.scss'],
})
export class IphoneSafariComponent {
  @Input() url: string = '';

  share(): void {
    // Lógica para compartir la URL
    console.log('Compartir URL:', this.url);
  }
}
