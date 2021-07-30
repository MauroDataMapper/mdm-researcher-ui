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

  hasReferenceData(dataElement: DataElement): boolean {
    return dataElement.dataType.domainType == 'ModelDataType' 
    && dataElement.dataType.modelResourceDomainType === 'ReferenceDataModel';
  }
}
