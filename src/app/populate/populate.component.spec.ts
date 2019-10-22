import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulateComponent } from './populate.component';

describe('PopulateComponent', () => {
  let component: PopulateComponent;
  let fixture: ComponentFixture<PopulateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
