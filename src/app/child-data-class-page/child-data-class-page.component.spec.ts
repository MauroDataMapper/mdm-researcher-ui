import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDataClassPageComponent } from './child-data-class-page.component';

describe('ChildDataClassPageComponent', () => {
  let component: ChildDataClassPageComponent;
  let fixture: ComponentFixture<ChildDataClassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildDataClassPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDataClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
