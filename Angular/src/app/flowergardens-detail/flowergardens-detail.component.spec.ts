import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowergardensDetailComponent } from './flowergardens-detail.component';

describe('FlowergardensDetailComponent', () => {
  let component: FlowergardensDetailComponent;
  let fixture: ComponentFixture<FlowergardensDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowergardensDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowergardensDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
