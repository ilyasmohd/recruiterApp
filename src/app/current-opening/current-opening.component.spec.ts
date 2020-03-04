import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOpeningComponent } from './current-opening.component';

describe('CurrentOpeningComponent', () => {
  let component: CurrentOpeningComponent;
  let fixture: ComponentFixture<CurrentOpeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentOpeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
