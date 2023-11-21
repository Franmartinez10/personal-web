import { Component } from '@angular/core';
import gsap from 'gsap';


@Component({
  selector: 'app-yo-nunca',
  templateUrl: './yo-nunca.component.html',
  styleUrls: ['./yo-nunca.component.scss']
})
export class YoNuncaComponent {

  currentPhrase?: string = '';
  logoPath: string = 'assets/logo.svg'; // Ruta del archivo SVG

  phrases: string[] = [
    "Yo nunca he viajado fuera del país.",
    "Yo nunca he probado sushi.",
    "Yo nunca he nadado en el océano.",
    "Yo nunca he montado en un globo aerostático.",
    "Yo nunca he saltado en paracaídas.",
    "Yo nunca he acampado en la naturaleza.",
    "Yo nunca he esquiado en la nieve.",
    "Yo nunca he comido comida picante.",
    "Yo nunca he visto una película de Star Wars completa.",
    "Yo nunca he participado en un maratón."
  ];

  

  constructor( ) {}

  ngOnInit() {
    // // Obtener frases desde la API al cargar el componente
    // this.appService.getPhrases().subscribe((data: any) => {
    //   this.phrases = data;
    // });
  }

  playAnimation() {
    if (this.phrases.length > 0) {
      gsap.timeline()
        .to('.phrases', { y: -100, opacity: 0, ease: 'power2.out', duration: 0.5 })
        .call(this.updatePhrase.bind(this))
        .to('.phrases', { y: 0, opacity: 1, ease: 'power2.in', duration: 0.5 });
    } else {
      alert('Ya no hay más frases');
    }
  }

  updatePhrase() {
    this.currentPhrase = this.phrases.pop();
  }

}


