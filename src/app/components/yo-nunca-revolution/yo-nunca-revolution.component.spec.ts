import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoNuncaRevolutionComponent } from './yo-nunca-revolution.component';

describe('YoNuncaRevolutionComponent', () => {
  let component: YoNuncaRevolutionComponent;
  let fixture: ComponentFixture<YoNuncaRevolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YoNuncaRevolutionComponent]
    });
    fixture = TestBed.createComponent(YoNuncaRevolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
