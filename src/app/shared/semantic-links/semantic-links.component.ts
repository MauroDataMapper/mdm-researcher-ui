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
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { CatalogueItem } from '@maurodatamapper/mdm-resources';

@Component({
  selector: 'mdm-semantic-links',
  templateUrl: './semantic-links.component.html',
  styleUrls: ['./semantic-links.component.scss']
})
export class SemanticLinksComponent implements OnInit {
  @Input() item: CatalogueItem;
  @Input() domainType: string;

  semanticLinks: any[] = [];
  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService
  ) { }

  ngOnInit(): void {

    this.resourcesService.catalogueItem
    .listSemanticLinks(this.domainType, this.item.id)
    .subscribe((resp) => {
      this.semanticLinks = resp.body.items;
      this.dataLoaded = Promise.resolve(true);
    });
  } 
}
