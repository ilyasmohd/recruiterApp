import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueSellingPropositionComponent } from './unique-selling-proposition.component';

describe('UniqueSellingPropositionComponent', () => {
  let component: UniqueSellingPropositionComponent;
  let fixture: ComponentFixture<UniqueSellingPropositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniqueSellingPropositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueSellingPropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
