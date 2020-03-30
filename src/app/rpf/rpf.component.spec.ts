import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpfComponent } from './rpf.component';

describe('RpfComponent', () => {
  let component: RpfComponent;
  let fixture: ComponentFixture<RpfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
