import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticComponent } from './domestic.component';

describe('DomesticComponent', () => {
  let component: DomesticComponent;
  let fixture: ComponentFixture<DomesticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
