import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IphonescreenComponent } from './iphonescreen.component';

describe('IphonescreenComponent', () => {
  let component: IphonescreenComponent;
  let fixture: ComponentFixture<IphonescreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IphonescreenComponent]
    });
    fixture = TestBed.createComponent(IphonescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
