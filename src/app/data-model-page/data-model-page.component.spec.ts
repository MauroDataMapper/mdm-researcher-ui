import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModelPageComponent } from './data-model-page.component';

describe('DataModelPageComponent', () => {
  let component: DataModelPageComponent;
  let fixture: ComponentFixture<DataModelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataModelPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataModelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
