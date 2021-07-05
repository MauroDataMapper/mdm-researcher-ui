import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticallyLinkedDataModelComponent } from './semantically-linked-data-model.component';

describe('SemanticallyLinkedDataModelComponent', () => {
  let component: SemanticallyLinkedDataModelComponent;
  let fixture: ComponentFixture<SemanticallyLinkedDataModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemanticallyLinkedDataModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticallyLinkedDataModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
