import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetProfileSectionComponent } from './target-profile-section.component';

describe('TargetProfileSectionComponent', () => {
  let component: TargetProfileSectionComponent;
  let fixture: ComponentFixture<TargetProfileSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetProfileSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetProfileSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
