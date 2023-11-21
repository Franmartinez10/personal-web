import { Component } from '@angular/core';
interface ContenidoItem {
  palabra: string;
  gif: string;
  sonido: string;
}
@Component({
  selector: 'app-home-desktop',
  templateUrl: './home-desktop.component.html',
  styleUrls: ['./home-desktop.component.scss']
})


export class HomeDesktopComponent {

  contenido: ContenidoItem[] = [
    { palabra: 'Texto', gif: '../../../assets/gif/gif1.gif', sonido: '../../../assets/sounds/s1.mp3' },
    { palabra: 'normal.', gif: '../../../assets/gif/gif2.gif', sonido: '../../../assets/sounds/s2.mp3' },
    { palabra: 'Parte', gif: '../../../assets/gif/gif3.gif', sonido: '../../../assets/sounds/s3.mp3' },
    { palabra: '1', gif: '../../../assets/gif/gif1.gif', sonido: '../../../assets/sounds/s1.mp3' },
    { palabra: 'del', gif: '../../../assets/gif/gif2.gif', sonido: '../../../assets/sounds/s2.mp3' },
    { palabra: 'texto.', gif: '../../../assets/gif/gif3.gif', sonido: '../../../assets/sounds/s3.mp3' }
    // Repite más elementos según sea necesario
  ];

  mostrarContenidoEspecifico: ContenidoItem | null = null;
  audioElement: HTMLAudioElement | null = null;

  reproducirAudio(item: ContenidoItem) {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    
    this.audioElement = new Audio(item.sonido);
    this.audioElement.play();
  }

  mostrarContenido(item: ContenidoItem) {
    this.mostrarContenidoEspecifico = item;
  }

  ocultarContenido() {
    this.mostrarContenidoEspecifico = null;
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
  }
}