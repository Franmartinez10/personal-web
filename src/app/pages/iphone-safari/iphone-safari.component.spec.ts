import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IphoneSafariComponent } from './iphone-safari.component';

describe('IphoneSafariComponent', () => {
  let component: IphoneSafariComponent;
  let fixture: ComponentFixture<IphoneSafariComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IphoneSafariComponent]
    });
    fixture = TestBed.createComponent(IphoneSafariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
