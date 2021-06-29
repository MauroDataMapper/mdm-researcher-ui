import { Component, OnInit } from '@angular/core';
import { catalogueItem } from '@mdm/shared/shared-classes';
import { LocalStorageHandlerService } from '@mdm/services/local-storage/local-storage-handler.service';

@Component({
  selector: 'mdm-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  localWishlist: catalogueItem[] = [];

  constructor(
    private localStorage: LocalStorageHandlerService,
  ) { }

  ngOnInit(): void {
    if (this.localStorage.containsKey('wishlist')) {
      this.localWishlist = JSON.parse(this.localStorage.getItem('wishlist'));
    } 
  }

  clearWishlist() {
    this.localStorage.clear();
    this.localWishlist = [];
  }

  removeElement(element: catalogueItem) {
    let index = this.localWishlist.findIndex(i => i.id === element.id);

    if (index > -1) {
      this.localWishlist.splice(index, 1);
      this.localStorage.setItem('wishlist', this.localWishlist);
    }
  }
}
