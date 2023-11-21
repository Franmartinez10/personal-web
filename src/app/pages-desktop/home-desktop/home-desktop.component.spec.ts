import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDesktopComponent } from './home-desktop.component';

describe('HomeDesktopComponent', () => {
  let component: HomeDesktopComponent;
  let fixture: ComponentFixture<HomeDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDesktopComponent]
    });
    fixture = TestBed.createComponent(HomeDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
