import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsteemedClientsComponent } from './esteemed-clients.component';

describe('EsteemedClientsComponent', () => {
  let component: EsteemedClientsComponent;
  let fixture: ComponentFixture<EsteemedClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsteemedClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsteemedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
