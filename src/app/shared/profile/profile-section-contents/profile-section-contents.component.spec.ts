import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSectionContentsComponent } from './profile-section-contents.component';

describe('ProfileSectionContentsComponent', () => {
  let component: ProfileSectionContentsComponent;
  let fixture: ComponentFixture<ProfileSectionContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSectionContentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSectionContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
