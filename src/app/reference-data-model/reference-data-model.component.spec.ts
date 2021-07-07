import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDataModelComponent } from './reference-data-model.component';

describe('ReferenceDataModelComponent', () => {
  let component: ReferenceDataModelComponent;
  let fixture: ComponentFixture<ReferenceDataModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceDataModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDataModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
