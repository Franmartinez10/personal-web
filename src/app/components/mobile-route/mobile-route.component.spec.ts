import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRouteComponent } from './mobile-route.component';

describe('MobileRouteComponent', () => {
  let component: MobileRouteComponent;
  let fixture: ComponentFixture<MobileRouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileRouteComponent]
    });
    fixture = TestBed.createComponent(MobileRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
