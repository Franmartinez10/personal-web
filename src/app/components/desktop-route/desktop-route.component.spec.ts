import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopRouteComponent } from './desktop-route.component';

describe('DesktopRouteComponent', () => {
  let component: DesktopRouteComponent;
  let fixture: ComponentFixture<DesktopRouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopRouteComponent]
    });
    fixture = TestBed.createComponent(DesktopRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
