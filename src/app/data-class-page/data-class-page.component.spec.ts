import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataClassPageComponent } from './data-class-page.component';

describe('DataClassPageComponent', () => {
  let component: DataClassPageComponent;
  let fixture: ComponentFixture<DataClassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataClassPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
