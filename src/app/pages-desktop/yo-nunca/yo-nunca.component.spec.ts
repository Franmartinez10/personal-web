import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoNuncaComponent } from './yo-nunca.component';

describe('YoNuncaComponent', () => {
  let component: YoNuncaComponent;
  let fixture: ComponentFixture<YoNuncaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YoNuncaComponent]
    });
    fixture = TestBed.createComponent(YoNuncaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
