import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StrapiService } from 'src/app/services/strapi.service';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, AfterViewInit {
  images: any[] = [];
  showFullImage = false;
  fullImageSrc: string | undefined;
  showFototeca = true; // Mostrará la fototeca por defecto
  showAlbums = false;
  albums: any[] = [];
  initialImages: any[] = []; // Guarda las imágenes originales
  initialAlbums: any[] = [];
  touchStartX: number | undefined;
  touchEndX: number | undefined;
  currentImageIndex = 0; // Índice de la imagen actual
  hammer: HammerManager | undefined;
  @ViewChild('bottomMenu') bottomMenu!: ElementRef;

  constructor(
    private strapiService: StrapiService,
    private translateService: TranslateService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.getFotos();
  }
  async getFotos() {
    this.strapiService.getPublicPhotos().then((data: any) => {
      this.images = this.transformApiResponse(data);
      this.initialImages = [...this.images]; // Guarda las imágenes originales
    });
  }
  ngAfterViewInit() {
    console.log(this.bottomMenu);
    const bottomMenuElement = this.bottomMenu.nativeElement;
    const hammer = new Hammer(bottomMenuElement);
    console.log(hammer);

    hammer.on('swipeup', () => {
      this.exitGallery();
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
      album: string; // Agrega el campo para el álbum
      loaded: boolean;
    }[] = [];

    data.data.forEach((item: any) => {
      const fotoData = item.attributes.foto.data;

      fotoData.forEach((photo: any) => {
        const newItem = {
          itemImageSrc: 'http://45.147.251.201:1337' + photo.attributes.url,
          thumbnailImageSrc:
            'http://45.147.251.201:1337' +
            photo.attributes.formats.thumbnail.url,
          alt: photo.attributes.caption || 'No description available',
          title: photo.attributes.name || 'No title available',
          album: item.attributes.Album || 'No album', // Obtener el nombre del álbum
          loaded: false,
        };

        transformedArray.push(newItem);
      });
    });

    return transformedArray;
  }

  toggleMenu(option: string) {
    if (option === 'fototeca') {
      this.images = [...this.initialImages]; // Restablece las imágenes originales
      this.showFototeca = true;
      this.showAlbums = false;
    } else if (option === 'albumes') {
      this.showAlbums = true;
      this.showFototeca = false;
      this.getAlbums();
      // this.albums = [...this.initialAlbums];
    }
  }

  getAlbums() {
    let images = this.initialImages;
    this.albums = images.reduce((acc, image) => {
      if (!acc.find((album: { title: any }) => album.title === image.album)) {
        acc.push({
          title: image.album,
          thumbnailImageSrc: image.thumbnailImageSrc, // Puedes usar la miniatura de la primera imagen del álbum
        });
      }
      return acc;
    }, []);
    this.initialAlbums = [...this.albums];
  }

  showAlbum(album: any) {
    this.images = this.initialImages.filter(
      (image) => image.album === album.title,
    );
    this.showAlbums = false;
    this.showFototeca = true;
  }
  // Suponiendo que `albums` y `initialImages` están definidos en tu componente

  countImagesPerAlbum(): Map<string, number> {
    const albumImageCounts = new Map<string, number>();

    this.albums.forEach((album) => {
      const count = this.initialImages.filter(
        (image) => image.album === album.title,
      ).length;
      albumImageCounts.set(album.title, count);
    });

    return albumImageCounts;
  }

  showImage(item: any) {
    this.fullImageSrc = item.itemImageSrc;
    this.showFullImage = true;
  }

  hideImage() {
    this.showFullImage = false;
    this.fullImageSrc = undefined;
  }

  // Touch gestures functions
  handleTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }
  exitGallery() {
    // Aquí puedes realizar acciones adicionales al salir de la galería
    console.log('f');

    this.router.navigate(['../home']); // Cambia '/home' a la ruta de tu escritorio de iPhone
  }

  // ... (resto del componente)

  isImageTransitioning = false; // Controla la animación de la imagen

  handleTouchEnd(event: TouchEvent) {
    if (this.touchStartX && this.touchEndX) {
      const diff = this.touchEndX - this.touchStartX;
      if (diff > 50 && this.currentImageIndex > 0) {
        this.changeImage(this.currentImageIndex - 1);
      } else if (
        diff < -50 &&
        this.currentImageIndex < this.images.length - 1
      ) {
        this.changeImage(this.currentImageIndex + 1);
      }
    }
    this.touchStartX = undefined;
    this.touchEndX = undefined;
  }

  changeImage(newIndex: number) {
    if (!this.isImageTransitioning && newIndex !== this.currentImageIndex) {
      this.isImageTransitioning = true;

      const leavingIndex = this.currentImageIndex;
      this.currentImageIndex = newIndex;

      setTimeout(() => {
        this.fullImageSrc = this.images[newIndex].itemImageSrc;
        this.isImageTransitioning = false;
      }, 300); // Tiempo de la transición CSS

      setTimeout(() => {
        this.images[leavingIndex].isActive = false;
      }, 10);
    }
  }

  handleTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
  }
}
