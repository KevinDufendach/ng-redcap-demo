import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRedcapComponent } from './ng-redcap.component';

describe('NgRedcapComponent', () => {
  let component: NgRedcapComponent;
  let fixture: ComponentFixture<NgRedcapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgRedcapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgRedcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
