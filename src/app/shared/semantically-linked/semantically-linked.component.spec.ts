import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticallyLinkedComponent } from './semantically-linked.component';

describe('SemanticallyLinkedComponent', () => {
  let component: SemanticallyLinkedComponent;
  let fixture: ComponentFixture<SemanticallyLinkedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemanticallyLinkedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticallyLinkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
