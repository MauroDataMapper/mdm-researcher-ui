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
import { ReferenceDataModelDetailResponse } from '@maurodatamapper/mdm-resources';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { combineLatest, EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, switchMap, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataValuesProviderService {
  private records: any[] = [];

  constructor(
    private resourcesService: MdmResourcesService
  ) { }

  public getReferenceDataValueFromId (referenceDataModelId: string) {
    // Request as rows
    const options = {
      asRows: true,
      all: true
    };
    return this.resourcesService.referenceDataValue.list(referenceDataModelId, options)
    .pipe(
      catchError(error => {
        console.log("Service error: " + error.toString());
        return EMPTY;
      }),
      map((results: any) => {
        let values = results.body.rows;
        // Flatten the endpoint response to make the table rows tabular and not an object hierarchy
        this.records = values.map(row => {
          const flattened = { };
          row.columns.forEach(column => {
              flattened[column.referenceDataElement.label] = column.value;
          });
          return flattened;
        });

        return this.records;
      }),
    )
  }

  public getReferenceDataValuesFrom(fileName: string) {
    return this.resourcesService.referenceDataModel.list().subscribe(res => {
      const targets = res.body.items.filter(r => r.label === fileName);
      let target;

      if (!targets || targets.lenght < 1) {
        return;
      }

      // Take the first matching element if any
      target = targets[0];

      
    });
  }
}
