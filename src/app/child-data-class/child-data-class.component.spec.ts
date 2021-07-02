import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDataClassComponent } from './child-data-class.component';

describe('ChildDataClassComponent', () => {
  let component: ChildDataClassComponent;
  let fixture: ComponentFixture<ChildDataClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildDataClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDataClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
