/**
 * Copyright 2020-2021 University of Oxford
 * and Health and Social Care Information Centre, also known as NHS Digital,
 * and University of Edinburgh.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
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
