import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataElementPageComponent } from './data-element-page.component';

describe('DataElementPageComponent', () => {
  let component: DataElementPageComponent;
  let fixture: ComponentFixture<DataElementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataElementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataElementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
