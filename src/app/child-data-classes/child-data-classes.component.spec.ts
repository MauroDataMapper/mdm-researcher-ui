import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDataClassesComponent } from './child-data-classes.component';

describe('ChildDataClassesComponent', () => {
  let component: ChildDataClassesComponent;
  let fixture: ComponentFixture<ChildDataClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildDataClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDataClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
