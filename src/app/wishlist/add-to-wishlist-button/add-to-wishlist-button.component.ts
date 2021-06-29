import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageHandlerService } from '@mdm/services/local-storage/local-storage-handler.service';
import { CatalogueItem } from '@maurodatamapper/mdm-resources';

@Component({
  selector: 'mdm-add-to-wishlist-button',
  templateUrl: './add-to-wishlist-button.component.html',
  styleUrls: ['./add-to-wishlist-button.component.scss']
})
export class AddToWishlistButtonComponent implements OnInit {
  @Input() item: CatalogueItem;

  localWishlist: CatalogueItem[] = [];
  alreadyInWishlist: boolean = false;

  constructor(
    private localStorage: LocalStorageHandlerService,
  ) { }

  ngOnInit(): void {
    if (this.localStorage.containsKey('wishlist')) {
      this.localWishlist = JSON.parse(this.localStorage.getItem('wishlist'));
    }

    if (this.localWishlist.findIndex(i => i.id === this.item.id) > -1) {
      this.alreadyInWishlist = true;
    }
  }

  addToWishlist() {
    this.localWishlist.push(this.item);
    this.localStorage.setItem('wishlist', this.localWishlist);
    this.alreadyInWishlist = true;
  }

  filterEqualElementId(element): boolean {
    return element.Id === "DataModel";
  }
}
