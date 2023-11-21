import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FullscreenService } from 'src/app/services/fullscreen.service';

@Component({
  selector: 'app-iphonescreen',
  templateUrl: './iphonescreen.component.html',
  styleUrls: ['./iphonescreen.component.scss'],
})
export class IphonescreenComponent {
  topApps = Array(4).fill(null); // 4 apps para la fila superior
  apps = Array(12).fill(null); // 20 apps para el resto de la pantalla
  webkitSpeechRecognition: any;
  constructor(
    private router: Router,
    private fullscreenService: FullscreenService,
  ) {}

  toggleFullscreen() {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      this.fullscreenService.requestFullscreen(element);
    } else {
      this.fullscreenService.exitFullscreen();
    }
  }

  // Setting up dock items for various applications

  appsTop: any[] = [
    // {
    //   label: 'Terminal',
    //   center: true,
    //   tooltipOptions: {
    //     tooltipLabel: 'Terminal',
    //     tooltipPosition: 'top',
    //     positionTop: -15,
    //     positionLeft: 15,
    //     showDelay: 1000,
    //   },
    //   icon: 'https://primefaces.org/cdn/primeng/images/dock/terminal.svg',
    //   command: () => {
    //     this.toggleFullscreen();
    //   },
    // },

    {
      label: 'Spotify',
      center: true,
      tooltipOptions: {
        tooltipLabel: 'Spotify',
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15,
        showDelay: 1000,
      },
      icon: '../../../assets/images/icons/SVG/logo_spotify.svg',
      command: () => {
        window.open(
          'https://open.spotify.com/playlist/50Z5LoyOGivPxj49fuB399?si=fe9301c828e5475e',
          '_blank',
        );
      },
    },
    // {
    //   label: this.translated.photo,
    //   center: true,
    //   tooltipOptions: {
    //     tooltipLabel: this.translated.photo,
    //     tooltipPosition: 'top',
    //     positionTop: -15,
    //     positionLeft: 15,
    //     showDelay: 1000,
    //   },
    //   icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg',
    //   command: () => {
    //     this.displayGalleria = true;
    //   },
    // },
    {
      label: 'GitHub',
      center: true,
      tooltipOptions: {
        tooltipLabel: 'GitHub',
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15,
        showDelay: 1000,
      },
      icon: 'https://primefaces.org/cdn/primeng/images/dock/github.svg',
      command: () => {
        window.open('https://github.com/Franmartinez10', '_blank');
      },
    },
    {
      label: 'Linkedin',
      center: true,
      tooltipOptions: {
        tooltipLabel: 'Linkedin',
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15,
        showDelay: 1000,
      },
      icon: '../../../assets/images/linkedin-app-icon.svg',
      command: () => {
        window.open(
          'https://www.linkedin.com/in/fran-martinez-torres-04008551/',
          '_blank',
        );
      },
    },
    {
      label: 'Behance',
      center: true,
      tooltipOptions: {
        tooltipLabel: 'Behance',
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15,
        showDelay: 1000,
      },
      icon: '../../../assets/images/behance-square-icon.svg',
      command: () => {
        window.open('https://www.behance.net/fran_martinez10', '_blank');
      },
    },
    {
      label: 'Yo Nunca',
      center: true,
      tooltipOptions: {
        tooltipLabel: 'YoNunca',
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15,
        showDelay: 1000,
      },
      icon: '../../../assets/images/icons/logo_yo_nunca[3183].jpg',
      command: () => {
        this.router.navigate(['yonunca']);
      },
    },
    {
      label: 'Photos',
      center: true,
      tooltipOptions: {
        tooltipLabel: 'Photos',
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15,
        showDelay: 1000,
      },
      icon: '../../../assets/images/icons/apple-photos.svg',
      command: () => {
        console.log('uu');

        this.router.navigate(['galeria']);
      },
    },
  ];
  bottomApps: any[] = [
    {
      label: 'Phone',
      center: true,
      tooltipOptions: {
        tooltipLabel: 'Phone',
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15,
        showDelay: 1000,
      },
      icon: '../../../assets/images/icons/apple-phone.svg',
      command: () => {
        window.open('tel:+34616351352', '_blank');
      },
    },
    {
      label: 'WhatsApp',
      center: true,
      tooltipOptions: {
        tooltipLabel: 'WhatsApp',
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15,
        showDelay: 1000,
      },
      icon: '../../../assets/images/icons/whatsapp.svg',
      command: () => {
        // this.displayAboutMe = true;
        window.open(
          'https://wa.me/34616351352?text=Hey%20Fran!%20I%27m%20interested%20in%20some%20of%20your%20services',
          '_blank',
        );
      },
    },

    {
      label: 'Safari',
      center: true,
      tooltipOptions: {
        tooltipLabel: 'Safari',
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15,
        showDelay: 1000,
      },
      icon: 'https://primefaces.org/cdn/primeng/images/dock/safari.svg',
      command: () => {
        console.log('uu');

        this.router.navigate(['safari']);
      },
    },
    {
      label: 'App Store',
      center: true,
      tooltipOptions: {
        tooltipLabel: 'App Store',
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15,
        showDelay: 1000,
      },
      icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg',
      command: () => {
        this.router.navigate(['galeria']);
      },
    },
    {
      label: 'Email',
      center: true,
      tooltipOptions: {
        tooltipLabel: 'Email',
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15,
        showDelay: 1000,
      },
      icon: '../../../assets/images/icons/apple-mail.svg',
      command: () => {
        window.open(
          'mailto:fran.martinez.torres@example.com?subject=Solicito%20informaci%C3%B3n%20sobre%20tus%20servicios&body=Hola%20Fran%2C%0A%0AEstaba%20interesad@%20en%20tus%20servicios%2C%20podr%C3%ADamos%20agendar%20una%20llamada%20?',
          '_blank',
        );
        // this.createDialog('Trash');
      },
    },
  ];

  openAppTop(index: number): void {
    this.apps[index];
    this.appsTop[index].command();
    const appIcons = document.querySelectorAll('.app-icon');
    appIcons.forEach((icon, i) => {
      if (i === index) {
        icon.classList.add('app-opened');
      } else {
        icon.classList.remove('app-opened');
      }
    });
  }

  openAppBottom(index: number): void {
    this.apps[index];
    this.bottomApps[index].command();

    const appIcons = document.querySelectorAll('.app-icon');
    appIcons.forEach((icon, i) => {
      if (i === index) {
        icon.classList.add('app-opened');
      } else {
        icon.classList.remove('app-opened');
      }
    });
  }
}
