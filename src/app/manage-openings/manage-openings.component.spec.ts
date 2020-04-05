import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOpeningsComponent } from './manage-openings.component';

describe('ManageOpeningsComponent', () => {
  let component: ManageOpeningsComponent;
  let fixture: ComponentFixture<ManageOpeningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOpeningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOpeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
