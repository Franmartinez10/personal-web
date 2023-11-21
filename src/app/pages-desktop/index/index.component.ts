import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { NodeService } from 'src/app/services/node.service';
import { PhotoService } from 'src/app/services/photo.service';
import { TerminalService } from 'primeng/terminal';
import { Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StrapiService } from 'src/app/services/strapi.service';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/services/app.service';

interface SubResponse {
  text: string;
  speech: string;
  subResponses: SubResponse[];
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [TerminalService],
})
export class IndexComponent {
  // Boolean flags for displaying various components/windows
  displayTerminal: boolean = false;
  displayDialog: boolean = true;
  displayFinder: boolean = false;
  displayGalleria: boolean = false;

  // Languages available

  languages: any[] = [
    { name: 'Español', code: 'es', flag: '🇪🇸' },
    { name: 'English', code: 'en', flag: '🇺🇸' },
    { name: 'Français', code: 'fr', flag: '🇫🇷' },

    // ... otros idiomas
  ];

  // Menu items and related properties
  dockItems: MenuItem[] = [];
  idDialog: number = 0;

  voz!: SpeechSynthesisVoice; // Voice variable for speech synthesis

  // Menu bar items, responsive options, and display states
  menubarItems: any[] = [];
  responsiveOptions: any[] = [];
  isMinimized: boolean = false;
  isMaximized: boolean = false;
  isFullScreen: boolean = true;
  spotifyDialog: boolean = false;

  // Siri chat properties
  messages: { text: string; type: string }[] = [];
  assistantActive: boolean = false;
  isFirstOptionSelected: boolean = false;
  showStatic: boolean = true;
  optionHistory: SubResponse[] = [];
  currentOptions: SubResponse[] = [];

  // Backgrounds for changing wallpaper and their properties
  backgrounds: string[] = [
    '../../../assets/images/wallpapers//DSC06640.jpeg',
    '../../../assets/images/wallpapers/hipopotamo.jpg',
    '../../../assets/images/wallpapers/Fran_Martinez_Torres.jpg',
  ];
  currentBackgroundIndex = 0;

  positions: (
    | 'bottom'
    | 'top'
    | 'left'
    | 'right'
    | 'topleft'
    | 'topright'
    | 'bottomleft'
    | 'bottomright'
    | 'center'
  )[] = ['topleft', 'topright', 'bottomleft', 'bottomright', 'center'];

  // Arrays for holding menu items, images, nodes, subscriptions, and dialog properties
  items: MenuItem[] = [];
  images: any[] = [];
  nodes: any[] = [];
  subscription: Subscription = new Subscription();
  appleItems: any[] = [];
  dialogsSaved: { titulo: string; content: string }[] = [];

  // Flag for displaying the 'About Me' section
  displayAboutMe: boolean = false;

  // Object for storing translated content and available voices for speech synthesis
  translated: any = {};
  voices: SpeechSynthesisVoice[] = [];
  selectedLanguage: any;

  // CONSTRUCTOR

  constructor(
    private nodeService: NodeService,
    public messageService: MessageService,
    private terminalService: TerminalService,
    private el: ElementRef,
    private sanitizer: DomSanitizer,
    private strapiService: StrapiService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private translateService: TranslateService,
    private appService: AppService,
  ) {}

  // Initialization logic in ngOnInit method
  ngOnInit() {
    // Initializing voice and fetching translated content
    this.getVoice();

    this.selectedLanguage = this.languages.find(
      (lang) => lang.code === this.appService.browserLang.substring(0, 2),
    );

    this.translateService.get('siro2', []).subscribe((data: any) => {
      this.currentOptions = data;
    });
    this.translateService.get('index', []).subscribe((data: any) => {
      this.translated = data;
      console.log(data);
      this.items = [
        {
          label: this.translated.contacto,
          icon: '',
          command: () => {
            this.displayAboutMe = true;
          },
        },
        { separator: true },
        {
          label: 'Linkedin',
          icon: '',
          command: () => {
            window.open(
              'https://www.linkedin.com/in/fran-martinez-torres-04008551/',
              '_blank',
            );
          },
        },
        {
          label: 'Behance',
          icon: '',
          command: () => {
            window.open('https://www.behance.net/fran_martinez10', '_blank');
          },
        },
        {
          label: 'GitHub',
          icon: '',
          command: () => {
            window.open('https://github.com/Franmartinez10', '_blank');
          },
        },
        { separator: true },

        {
          label: this.translated.wallpaper,
          icon: '',
          command: () => {
            this.cambiarFondo();
          },
        },
      ];
    });

    // Setting up menu items based on translated content

    // Setting up dock items for various applications

    this.dockItems = [
      {
        label: 'Finder',
        center: true,
        tooltipOptions: {
          tooltipLabel: 'Finder',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg',
        command: () => {
          this.displayAboutMe = true;
        },
      },
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
      //     this.displayTerminal = true;
      //   },
      // },
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
          this.createDialog('Yo Nunca Revolution');
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
          this.createDialog('Safari');
        },
      },
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
        icon: '../../../assets/images/logo_Spotify.svg',
        command: () => {
          this.spotifyDialog = this.spotifyDialog == false ? true : false;
        },
      },
      {
        label: this.translated.photo,
        center: true,
        tooltipOptions: {
          tooltipLabel: this.translated.photo,
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg',
        command: () => {
          this.displayGalleria = true;
        },
      },
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
        label: 'Trash',
        center: true,
        tooltipOptions: {
          tooltipLabel: 'Trash',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png',
        command: () => {
          this.createDialog('Trash');
        },
      },
    ];
    // Setting up menu bar items for navigation and actions

    this.menubarItems = [
      {
        label: 'Finder',
        disabled: true,
        styleClass: 'menubar-root',
      },
      {
        label: 'File',
        disabled: true,

        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark',
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video',
              },
            ],
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash',
          },
          {
            separator: true,
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link',
          },
        ],
      },
      {
        label: 'Edit',
        disabled: true,

        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left',
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center',
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify',
          },
        ],
      },
      {
        label: 'Users',
        disabled: true,

        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print',
                  },
                ],
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
              },
            ],
          },
        ],
      },
      {
        label: 'Events',
        disabled: true,

        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
        ],
      },
      {
        label: 'Quit',
        disabled: true,
      },
    ];
    // Apple menu items with options

    this.appleItems = [
      {
        label: '',
        styleClass: 'menubar-root',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark',
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video',
              },
            ],
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash',
          },
          {
            separator: true,
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link',
          },
        ],
      },
    ];
    // Responsive options for display

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
    // Subscribing to command handler in terminal service

    this.subscription = this.terminalService.commandHandler.subscribe(
      (command) => this.commandHandler(command),
    );

    // Fetching files and images
    this.nodeService.getFiles().then((data) => (this.nodes = data));

    this.getFotos();
  }

  /// LANGUAJE MODIFICATION
  async changeLanguage(e: any) {
    console.log(e);
    this.appService.chooseLanguaje(e.value.code);
    this.translateService.get('siro2', []).subscribe((data: any) => {
      this.currentOptions = data;
    });
    this.translateService.get('index', []).subscribe((data: any) => {
      this.translated = data;
      console.log(data);
      this.items = [
        {
          label: this.translated.contacto,
          icon: '',
          command: () => {
            this.displayAboutMe = true;
          },
        },
        { separator: true },
        {
          label: 'Linkedin',
          icon: '',
          command: () => {
            window.open(
              'https://www.linkedin.com/in/fran-martinez-torres-04008551/',
              '_blank',
            );
          },
        },
        {
          label: 'Behance',
          icon: '',
          command: () => {
            window.open('https://www.behance.net/fran_martinez10', '_blank');
          },
        },
        {
          label: 'GitHub',
          icon: '',
          command: () => {
            window.open('https://github.com/Franmartinez10', '_blank');
          },
        },
        { separator: true },

        {
          label: this.translated.wallpaper,
          icon: '',
          command: () => {
            this.cambiarFondo();
          },
        },
      ];
    });
  }

  commandHandler(text: any) {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch (command) {
      case 'date':
        response = 'Today is ' + new Date().toDateString();
        break;

      case 'greet':
        response = 'Hola ' + text.substring(argsIndex + 1) + '!';
        break;

      case 'random':
        response = Math.floor(Math.random() * 100);
        break;

      default:
        response = 'Unknown command: ' + command;
        break;
    }

    if (response) {
      this.terminalService.sendResponse(response as string);
    }
  }

  // Active Tabs

  dialogs: any[] = [];
  number: number = 0;

  // Toggle fullscreen

  toggleFullScreen() {
    const elem = this.el.nativeElement as any; // Se usa 'as any' para evitar errores de tipo

    const doc = document as any; // Se usa 'as any' para evitar errores de tipo

    if (
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    ) {
      // Si estamos en pantalla completa, salimos de ella
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    } else {
      // Si no estamos en pantalla completa, solicitamos entrar
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  }
  // FN to create new dialogs
  createDialog(titulo: string): any[] {
    const randomPositionIndex = Math.floor(
      Math.random() * this.positions.length,
    );
    const randomPosition = this.positions[randomPositionIndex];

    this.dialogsSaved = [
      {
        titulo: 'Safari',
        content: ``,
      },
      {
        titulo: 'Finder',
        content: `
      `,
      },
      {
        titulo: 'Curriculum_Fran_Martinez.pdf',
        content: ``,
      },
      {
        titulo: 'Trash',
        content: ` 

       `,
      },
      {
        titulo: 'Yo Nunca Revolution',
        content: ` 

       `,
      },
      {
        titulo: 'Summer_july_2014.jpg',
        content: ` 
        <div style="width: 1080px;">
        <img style="width: 1080px;" src="../../../assets/images/summer_july_2014.jpg" alt="" />
        </div>

       `,
      },
    ];
    const newDialog: any = {
      id: this.number,
      position: 'center',
      content: this.dialogsSaved.find((a) => {
        return a.titulo == titulo;
      })?.content,
      titulo: this.dialogsSaved.find((a) => {
        return a.titulo == titulo;
      })?.titulo,
      display: true,
      style: {
        width: 'auto',
        minWidth: '600px',
        'min-height': '600px',
        border: 'none',
        'border-radius': '5px',
      },
      isMaximized: false,
    };
    newDialog.id = ++this.idDialog;
    newDialog.content = this.sanitizer.bypassSecurityTrustHtml(
      newDialog.content,
    );

    this.dialogs.push(newDialog);
    return this.dialogs;
  }
  // FN to close  dialogs

  closeDialog(dialogIndex: number): void {
    this.dialogs.splice(dialogIndex, 1);
  }
  // FN to show the dialogs from dialogs array

  showDialog() {
    this.displayDialog = true;
  }

  getSafeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.translated.aboutMeDetails.curriculum_pdf,
    );
  }
  // FN to maximize  dialogs

  maximizeDialog(dialog: any) {
    const foundDialog = this.dialogs.find((i) => dialog.id === i.id);

    if (foundDialog) {
      foundDialog.isMaximized = !foundDialog.isMaximized;
    } else {
      console.log('El diálogo no se encontró');
    }
  }
  // FN to minimize new dialogs - not using

  minimizeDialog() {
    this.isMinimized = !this.isMinimized;
    // Aquí puedes realizar acciones adicionales al minimizar/maximizar si es necesario
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /// CHAT SIRI
  async getVoice() {
    const synth = window.speechSynthesis;

    const voicesPromise = new Promise<SpeechSynthesisVoice[]>((resolve) => {
      synth.onvoiceschanged = () => {
        const voices = synth.getVoices();
        console.log(voices);

        resolve(voices);
      };
    });

    this.voices = await voicesPromise;
  }

  // Asynchronous function to speak text
  async speakText(textToSpeak: string) {
    const synth = window.speechSynthesis;
    const voices = this.voices;

    // Checking and setting the voice based on translated language
    if (this.translated.lang) {
      if (this.translated.lang === 'es_ES') {
        this.voz = voices[149];
      }
      if (this.translated.lang === 'fr_FR') {
        this.voz = voices[151];
      }
      if (this.translated.lang === 'en_US') {
        this.voz = voices[148];
      }
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Setting utterance rate based on translated language
    if (this.translated.lang) {
      if (
        this.translated.lang === 'es_ES' ||
        this.translated.lang === 'fr_FR'
      ) {
        utterance.rate = 1.0;
      }
      // For other languages, additional configurations can be added
    }

    utterance.voice = this.voz;

    synth.speak(utterance);
  }

  // Activating the assistant and speaking the help text
  activateAssistant() {
    this.assistantActive = true;
    this.speakText(this.translated.ayuda);
  }

  // Deactivating the assistant
  deactivateAssistant() {
    this.assistantActive = false;
  }

  // Handling user option click in the assistant
  handleOptionClick(option: SubResponse) {
    window.speechSynthesis.cancel();

    if (option.subResponses.length > 0) {
      this.optionHistory.push(option);

      // Updating current options based on selected sub-responses
      this.currentOptions = option.subResponses.map((response) => ({
        ...response,
      }));

      // Speaking the selected option's speech text and scrolling to the bottom
      this.speakText(` ${option.speech}`).then(() => {
        this.scrollToBottom();
      });
    } else {
      // Adding user and assistant messages and speaking the assistant's response
      this.messages.push({ text: `Usuario: ${option.text}`, type: 'user' });
      this.messages.push({ text: `Asistente: ${option.speech}`, type: 'bot' });

      this.speakText(`${option.speech}`).then(() => {
        this.scrollToBottom();
      });
    }
  }

  goBack() {
    if (this.optionHistory.length > 1) {
      this.optionHistory.pop(); // Elimina la última opción del historial

      const lastOption = this.optionHistory[this.optionHistory.length - 1];
      this.currentOptions = lastOption.subResponses.map((response) => ({
        ...response,
      }));
    } else {
      // Maneja el caso si solo queda una opción en el historial o no hay opciones.
    }
  }

  resetConversation() {
    this.isFirstOptionSelected = false;
    this.optionHistory = [];
    // Vuelve al estado inicial de las opciones
    this.messages = []; // Limpiar mensajes
  }

  scrollToBottom() {
    const chatBox = document.querySelector('.chat-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  getFotos() {
    this.strapiService.getPublicPhotos().then((data: any) => {
      this.images = this.transformApiResponse(data);
    });
  }

  /// funcion galeria de fotos
  transformApiResponse(apiResponse: { data: any }) {
    const data = apiResponse.data;
    const transformedArray: {
      itemImageSrc: any;
      thumbnailImageSrc: any;
      alt: any;
      title: any;
      loaded: boolean;
    }[] = [];

    data.data.forEach((item: { attributes: { foto: { data: any } } }) => {
      const fotoData = item.attributes.foto.data;

      fotoData.forEach(
        (photo: {
          attributes: {
            url: any;
            formats: { thumbnail: { url: any } };
            caption: any;
            name: any;
          };
        }) => {
          const newItem = {
            itemImageSrc: 'http://45.147.251.201:1337' + photo.attributes.url,
            thumbnailImageSrc:
              'http://45.147.251.201:1337' +
              photo.attributes.formats.thumbnail.url,
            alt: photo.attributes.caption || 'No description available',
            title: photo.attributes.name || 'No title available',
            loaded: false,
          };

          transformedArray.push(newItem);
        },
      );
    });

    return transformedArray;
  }

  // FN para Cambiar de Fondo
  cambiarFondo() {
    const dockWindow =
      this.elementRef.nativeElement.querySelector('.dock-window');
    if (dockWindow) {
      this.renderer.setStyle(
        dockWindow,
        'background-image',
        `url(${this.backgrounds[this.currentBackgroundIndex]})`,
      );

      // Cambia al siguiente fondo en el array
      this.currentBackgroundIndex++;
      if (this.currentBackgroundIndex >= this.backgrounds.length) {
        this.currentBackgroundIndex = 0;
      }
    }
  }

  onImageLoad(item: any) {
    item.loaded = true;
  }
}
