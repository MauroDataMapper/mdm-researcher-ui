import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDataModelPageComponent } from './reference-data-model-page.component';

describe('ReferenceDataModelPageComponent', () => {
  let component: ReferenceDataModelPageComponent;
  let fixture: ComponentFixture<ReferenceDataModelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceDataModelPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDataModelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
