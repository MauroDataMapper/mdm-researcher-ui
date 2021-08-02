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
import { DataModelDetail, DataModelDetailResponse, CatalogueItem, ModelDomainType, Uuid } from '@maurodatamapper/mdm-resources'; 
import { catalogueItem } from '@shared/shared-classes';

@Component({
  selector: 'mdm-data-model',
  templateUrl: './data-model.component.html',
  styleUrls: ['./data-model.component.scss']
})
export class DataModelComponent implements OnInit {

  @Input() id: Uuid;
  @Input() page: boolean;
  @Input() linkType: string;
  @Input() direction: string;  
  @Input() semanticLink: any;
  dataModel: DataModelDetail;
  catalogueItem: catalogueItem;
  CatalogueItem: CatalogueItem;
  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService
    ) { }

  ngOnInit(): void {

    this.resourcesService.dataModel
      .get(this.id)
      .subscribe(async (result: DataModelDetailResponse) => {
        this.dataModel = result.body;
        this.CatalogueItem = this.dataModel;

        this.catalogueItem = new catalogueItem();
        this.catalogueItem.id = this.dataModel.id;
        this.catalogueItem.domainType = 'DataModel';
        this.catalogueItem.label = this.dataModel.label;
        this.catalogueItem.model = this.dataModel.model;
        this.catalogueItem.breadcrumbs = this.dataModel.breadcrumbs;
        this.catalogueItem.description = this.dataModel.description;

        this.dataLoaded = Promise.resolve(true);
      });
  }

}
