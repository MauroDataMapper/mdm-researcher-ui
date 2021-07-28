import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModelElementsProfileTableComponent } from './data-model-elements-profile-table.component';

describe('DataModelElementsProfileTableComponent', () => {
  let component: DataModelElementsProfileTableComponent;
  let fixture: ComponentFixture<DataModelElementsProfileTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataModelElementsProfileTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataModelElementsProfileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
