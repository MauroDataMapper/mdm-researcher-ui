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
      asRows: true
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
