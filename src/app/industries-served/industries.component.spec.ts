import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustriesServedComponent } from './industries.component';

describe('IndustriesComponent', () => {
  let component: IndustriesServedComponent;
  let fixture: ComponentFixture<IndustriesServedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustriesServedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustriesServedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
