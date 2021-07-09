import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataClassDataClassesComponent } from './data-class-data-classes.component';

describe('DataClassDataClassesComponent', () => {
  let component: DataClassDataClassesComponent;
  let fixture: ComponentFixture<DataClassDataClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataClassDataClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataClassDataClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
