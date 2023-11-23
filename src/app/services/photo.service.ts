import { Injectable } from '@angular/core';
import { StrapiService } from './strapi.service';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public apiUrl = environment.photoUrl;

  indexGallery: number = Math.floor(Math.random() * (15 - 1 + 1) + 1);
  images: {
    itemImageSrc: any;
    thumbnailImageSrc: any;
    alt: any;
    title: any;
    album: string; // Agrega el campo para el álbum

    // Agrega el campo para el álbum
    loaded: boolean;
  }[] = [];
  initialImages: {
    itemImageSrc: any;
    thumbnailImageSrc: any;
    alt: any;
    title: any;
    album: string; // Agrega el campo para el álbum

    // Agrega el campo para el álbum
    // Agrega el campo para el álbum
    loaded: boolean;
  }[] = [];
  constructor(private strapiService: StrapiService) {
    this.getFotos();
  }

  async getFotos() {
    this.strapiService.getPublicPhotos().then((data: any) => {
      this.images = this.transformApiResponse(data);
      this.initialImages = [...this.images]; // Guarda las imágenes originales
      return true;
    });
  }
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
          itemImageSrc: this.apiUrl + photo.attributes.url,
          thumbnailImageSrc:
            this.apiUrl + photo.attributes.formats.thumbnail.url,
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
}
