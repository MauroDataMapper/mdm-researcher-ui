import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataClassDataElementsComponent } from './data-class-data-elements.component';

describe('DataClassDataElementsComponent', () => {
  let component: DataClassDataElementsComponent;
  let fixture: ComponentFixture<DataClassDataElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataClassDataElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataClassDataElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
