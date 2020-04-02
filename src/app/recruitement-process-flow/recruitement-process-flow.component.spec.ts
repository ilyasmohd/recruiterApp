import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitementProcessFlowComponent } from './recruitement-process-flow.component';

describe('RecruitementProcessFlowComponent', () => {
  let component: RecruitementProcessFlowComponent;
  let fixture: ComponentFixture<RecruitementProcessFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitementProcessFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitementProcessFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
