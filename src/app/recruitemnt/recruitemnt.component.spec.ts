import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitemntComponent } from './recruitemnt.component';

describe('RecruitemntComponent', () => {
  let component: RecruitemntComponent;
  let fixture: ComponentFixture<RecruitemntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitemntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitemntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
