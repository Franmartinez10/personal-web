import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSearchComponent } from './error-search.component';

describe('ErrorSearchComponent', () => {
  let component: ErrorSearchComponent;
  let fixture: ComponentFixture<ErrorSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorSearchComponent]
    });
    fixture = TestBed.createComponent(ErrorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
