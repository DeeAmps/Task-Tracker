import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogTasksComponent } from './log-tasks.component';

describe('LogTasksComponent', () => {
  let component: LogTasksComponent;
  let fixture: ComponentFixture<LogTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
