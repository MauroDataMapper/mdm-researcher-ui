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

import { Injectable } from '@angular/core';
import {  MdmSecurityResource, 
          MdmResourcesConfiguration, 
          MdmSessionResource, 
          MdmCatalogueItemResource,
          MdmDataModelResource,
          MdmDataClassResource,
          MdmDataElementResource,
          MdmProfileResource,
          MdmClassifierResource,
          MdmReferenceDataModelResource,
          MdmReferenceDataValueResource
 } from '@maurodatamapper/mdm-resources';
import { MdmRestHandlerService } from './mdm-rest-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MdmResourcesService {

  security = new MdmSecurityResource(this.resourcesConfig, this.restHandler);
  session = new MdmSessionResource(this.resourcesConfig, this.restHandler);
  catalogueItem = new MdmCatalogueItemResource(this.resourcesConfig, this.restHandler);
  dataModel = new MdmDataModelResource(this.resourcesConfig, this.restHandler);
  dataClass = new MdmDataClassResource(this.resourcesConfig, this.restHandler);
  dataElement = new MdmDataElementResource(this.resourcesConfig, this.restHandler);
  profileResource = new MdmProfileResource(this.resourcesConfig, this.restHandler);
  classifierResource = new MdmClassifierResource(this.resourcesConfig, this.restHandler);
  referenceDataModel = new MdmReferenceDataModelResource(this.resourcesConfig, this.restHandler);
  referenceDataValue = new MdmReferenceDataValueResource(this.resourcesConfig, this.restHandler);

  constructor(
    private resourcesConfig: MdmResourcesConfiguration, 
    private restHandler: MdmRestHandlerService) { }
}
