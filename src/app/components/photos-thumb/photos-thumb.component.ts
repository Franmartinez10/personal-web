import { Component } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photos-thumb',
  templateUrl: './photos-thumb.component.html',
  styleUrls: ['./photos-thumb.component.scss'],
})
export class PhotosThumbComponent {
  constructor(public photoService: PhotoService) {}
  cambiarfoto() {
    return this.photoService.images[this.photoService.indexGallery][
      'itemImageSrc'
    ] !== undefined
      ? this.photoService.images[this.photoService.indexGallery].itemImageSrc
      : '';
  }
  cambiarIndex() {
    this.photoService.indexGallery + 1;
  }
}
