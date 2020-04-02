import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalApplicantsComponent } from './total-applicants.component';

describe('TotalApplicantsComponent', () => {
  let component: TotalApplicantsComponent;
  let fixture: ComponentFixture<TotalApplicantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalApplicantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
