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
import { DataElement, Uuid } from '@maurodatamapper/mdm-resources'; 
import { DataElementFieldsProviderService } from '@mdm/services/data-providers/data-element-fields-provider.service';

@Component({
  selector: 'mdm-data-model-elements-profile-table',
  templateUrl: './data-model-elements-profile-table.component.html',
  styleUrls: ['./data-model-elements-profile-table.component.scss']
})
export class DataModelElementsProfileTableComponent implements OnInit {

  @Input() dataModelId: Uuid;

  uniqueColumnName: string[] = [];
  rows: any[] = [];
  numberOfTableColumns: number = 3;

  dataLoaded: Promise<boolean>;

  constructor(
    private dataElementFieldsProvider: DataElementFieldsProviderService,
    ) { }

  ngOnInit(): void {
      this.makeTable();
  }

  async makeTable() {
    const result = await this.fetchDataFor(this.dataModelId);

    this.dataElementFieldsProvider.handleHiddenFields(result);


    this.uniqueColumnName = this.dataElementFieldsProvider.getUniqueColumnsFromFields(result, [], []);
    //Plus 3 because we add name, description and type
    this.numberOfTableColumns = this.uniqueColumnName.length + 3;
    this.makeRows(result, this.uniqueColumnName);

    this.dataLoaded = Promise.resolve(true);
  }

  async fetchDataFor(dataModelId: Uuid) {
    return this.dataElementFieldsProvider.getDataElementFields(dataModelId).toPromise();
  }

  private makeRows(result: any, uniqueColumnName: string[]) {
    if (result) {
      // For each DE in the DM
      for (let ii = 0; ii < result.length; ii++) {

        let profileValues = [];
        // Look for the column index of the name and
        // use it to set the appropiate cell of the row
    
        uniqueColumnName.forEach(columnName => {
          var prefixedIndex = uniqueColumnName.indexOf(columnName);
            
          let found = result[ii].profilesFields.filter(item => item.fieldName === columnName);
            
          if (found.length == 1) {
            profileValues[prefixedIndex] = found[0];
          } else {
            profileValues[prefixedIndex] = null;
          }
        });
    
        this.rows.push({dataElement: result[ii].dataElement, profileValues: profileValues});
      }  
    }
  }

  hasReferenceData(dataElement: DataElement): boolean {
    return dataElement.dataType.domainType == 'ModelDataType' 
    && dataElement.dataType.modelResourceDomainType === 'ReferenceDataModel';
  }
}
