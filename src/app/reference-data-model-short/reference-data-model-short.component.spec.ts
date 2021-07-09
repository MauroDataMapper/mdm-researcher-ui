import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDataModelShortComponent } from './reference-data-model-short.component';

describe('ReferenceDataModelShortComponent', () => {
  let component: ReferenceDataModelShortComponent;
  let fixture: ComponentFixture<ReferenceDataModelShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceDataModelShortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDataModelShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
