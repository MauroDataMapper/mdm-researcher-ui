import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModelDataClassesComponent } from './data-model-data-classes.component';

describe('DataModelDataClassesComponent', () => {
  let component: DataModelDataClassesComponent;
  let fixture: ComponentFixture<DataModelDataClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataModelDataClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataModelDataClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
