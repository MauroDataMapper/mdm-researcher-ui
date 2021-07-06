import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadWishlistComponent } from './download-wishlist.component';

describe('DownloadWishlistComponent', () => {
  let component: DownloadWishlistComponent;
  let fixture: ComponentFixture<DownloadWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadWishlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
