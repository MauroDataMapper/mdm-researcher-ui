import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticLinksComponent } from './semantic-links.component';

describe('SemanticLinksComponent', () => {
  let component: SemanticLinksComponent;
  let fixture: ComponentFixture<SemanticLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemanticLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
