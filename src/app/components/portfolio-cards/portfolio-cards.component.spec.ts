import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCardsComponent } from './portfolio-cards.component';

describe('PortfolioCardsComponent', () => {
  let component: PortfolioCardsComponent;
  let fixture: ComponentFixture<PortfolioCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioCardsComponent]
    });
    fixture = TestBed.createComponent(PortfolioCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
