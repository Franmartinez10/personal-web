import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosThumbComponent } from './photos-thumb.component';

describe('PhotosThumbComponent', () => {
  let component: PhotosThumbComponent;
  let fixture: ComponentFixture<PhotosThumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosThumbComponent]
    });
    fixture = TestBed.createComponent(PhotosThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
