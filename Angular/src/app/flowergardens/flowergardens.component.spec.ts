import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowergardensComponent } from './flowergardens.component';

describe('FlowergardensComponent', () => {
  let component: FlowergardensComponent;
  let fixture: ComponentFixture<FlowergardensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowergardensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowergardensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
