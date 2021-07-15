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
}
