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
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { combineLatest, EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, switchMap, map, mergeMap } from 'rxjs/operators';
import { DataClassDetail, DataClassIndexResponse, DataElement, DataElementIndexResponse, MdmResponse, Uuid } from '@maurodatamapper/mdm-resources';
import { DataElementFields } from '@mdm/models/data-element-fields';

@Injectable({
  providedIn: 'root'
})
export class DataElementFieldsProviderService {

  constructor(
    private resourcesService: MdmResourcesService,
  ) { }

  public getDataElementFields(forDataModelId: string): any{

    let dataElementProfilesFields: DataElementFields[] = [];

    return this.resourcesService.dataClass
    // Step 1 - get all Data Classes for a Data Model
    .list(forDataModelId)
    .pipe(
      catchError(error => {
        console.log("Service error: " + error.toString());
        return EMPTY;
      }),
      // Step 2 - For each Data Class, get all Data Elements
      switchMap((response: DataClassIndexResponse) => {
        // Collect all the HTTP requests to send (doesn't do anything yet - lazy loading)
        const requests = response.body.items.map<Observable<DataElementIndexResponse>>(dataClass => {
          return this.resourcesService.dataElement.list(forDataModelId, dataClass.id);
        });
        // forkJoin accepts a list of observables and returns the last emitted value from each - in this
        // case there is only one value per observable which is the HTTP response
        return forkJoin(requests);
      }),
      // Step 3 - For each Data Element, get the profiles used
      mergeMap((responses: DataElementIndexResponse[]) => {
        // Flatten the complete list of Data Elements into one continuous array
        const dataElements = responses
          .map(response => response.body.items)
          .reduce((prev, current) => prev.concat(current), []);
        // Collect all the HTTP requests to call. Along with each request, use the combineLatest() operator to also "attach"
        // the Data Element it relates to. This local value is effectively being passed down the observable pipeline so other
        // functions can use it too
        const requests = dataElements.map(dataElement => {
          return combineLatest([
            of(dataElement),
            this.resourcesService.profileResource.usedProfiles(dataElement.domainType, dataElement.id)
          ])
        });
        return forkJoin(requests);
      }),
      // Step 4 - For each profile, get the sections/fields in that profile
      mergeMap((values: [DataElement, MdmResponse<any>][]) => {
        const allRequests = values.map(value => {
          // values is an array of tuples - extract the Data Element and HTTP response for each tuple
          const dataElement = value[0];
          const providers: any[] = value[1].body;
          // Collect all the HTTP requests to call for the profile endpoints. Again, combineLatest() will "attach"
          // the Data Element along with the responses
          const requests = providers.map(provider => {
            return combineLatest([
              of(dataElement),
              this.resourcesService.profileResource.profile(
                dataElement.domainType,
                dataElement.id,
                provider.namespace,
                provider.name)
            ]);
          });
          return requests;
        });
        // allRequests is a 2D array, so flatten again
        const requestsToSend = allRequests
          .reduce((prev, current) => prev.concat(current), []);
        return forkJoin(requestsToSend);
      }),
      map((results: [DataElement, MdmResponse<any>][]) => {
        // Finally, subscribe() so that this observable pipeline will run.
        // It's an array of tuples again, so look through it and extract the tuple values
        results.forEach(result => {
          const dataElement = result[0];
          const profileSections = result[1].body.sections;

          let dataElementProfile = new DataElementFields();
          dataElementProfile.dataElement = dataElement;
          dataElementProfile.dataElementLabel = dataElement.label;


          profileSections.forEach(section => {
            section.fields.forEach(field => {
              dataElementProfile.profilesFields.push(field);
            });
          });

          dataElementProfilesFields.push(dataElementProfile);
        });

        return dataElementProfilesFields;
      }),
    )
  }

  public handleHiddenFields(result: any) {
    if (result) {
      // Consider _hidden field
      for (let ii = 0; ii < result.length; ii++) {
        // Get all _hidden fields
        let _hidden = result[ii].profilesFields.filter(f => f.fieldName === "_hidden");

        if (_hidden.length < 1) {
          continue;
        }

        // Take the current values of all the fields into one array
        let _hiddenFieldsValues = _hidden.map(hid => {return hid.currentValue});

        // Join the previous arrays into one single string,
        // then separate by ";"
        let _hiddenFields = _hiddenFieldsValues.join().split(";");

        // Trim each entry
        for (let jj = 0; jj < _hiddenFields.length; jj++) {

          if (_hiddenFields[jj] && _hiddenFields[jj].length > 0) {
            _hiddenFields[jj] = _hiddenFields[jj].trimStart();
          }
        }

        // Filter the list to be only those elements that are not hidden or the _hidden field itself
        result[ii].profilesFields = result[ii].profilesFields.filter(f => _hiddenFields.indexOf(f.fieldName) === -1);
        result[ii].profilesFields = result[ii].profilesFields.filter(f => f.fieldName !== "_hidden");
      }
    }
  }

  public getUniqueColumnsFromFields(result: any, preProfile: string[], postProfile: string[]) {
    let uniqueColumnName: string[] = [];
    // Get a list for all the unique names for fields across all dataElements in this tab
    preProfile.forEach(column => {
      this.addIfUnique(column, uniqueColumnName);
    });

    if (result) {
      for (let ii = 0; ii < result.length; ii++) {
        for (let jj = 0; jj < result[ii].profilesFields.length; jj++) {
          this.addIfUnique(result[ii].profilesFields[jj].fieldName, uniqueColumnName);
        }
      }
    }

    postProfile.forEach(column => {
      this.addIfUnique(column, uniqueColumnName);
    });

    return uniqueColumnName;
  }  

  private addIfUnique(element: string, list: string[]) {
    if (list.indexOf(element) == -1) {
      list.push(element);
    }
  }
}
