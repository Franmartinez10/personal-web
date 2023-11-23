import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojComponent } from './reloj.component';

describe('RelojComponent', () => {
  let component: RelojComponent;
  let fixture: ComponentFixture<RelojComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelojComponent]
    });
    fixture = TestBed.createComponent(RelojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
