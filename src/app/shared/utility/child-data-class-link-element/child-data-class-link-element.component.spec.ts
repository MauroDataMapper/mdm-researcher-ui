import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDataClassLinkElementComponent } from './child-data-class-link-element.component';

describe('ChildDataClassLinkElementComponent', () => {
  let component: ChildDataClassLinkElementComponent;
  let fixture: ComponentFixture<ChildDataClassLinkElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildDataClassLinkElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDataClassLinkElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
