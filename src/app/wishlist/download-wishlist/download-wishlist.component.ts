import { Component, OnInit } from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { catalogueItem } from '@mdm/shared/shared-classes';
import { LocalStorageHandlerService } from '@mdm/services/local-storage/local-storage-handler.service';
import { DataElementFieldsProviderService } from '@mdm/services/data-providers/data-element-fields-provider.service';
import { ReferenceDataValuesProviderService } from '@mdm/services/data-providers/reference-data-values-provider.service';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';

@Component({
  selector: 'mdm-download-wishlist',
  templateUrl: './download-wishlist.component.html',
  styleUrls: ['./download-wishlist.component.scss']
})
export class DownloadWishlistComponent implements OnInit {

  localWishlist: catalogueItem[] = [];
  requiresJustificationReferenceData: boolean = false;

  constructor(
    private localStorage: LocalStorageHandlerService,
    private dataElementFieldsProvider: DataElementFieldsProviderService,
    private referenceDataValueProvider: ReferenceDataValuesProviderService,
    private resourcesService: MdmResourcesService,
  ) { }

  ngOnInit(): void {
    if (this.localStorage.containsKey('wishlist')) {
      this.localWishlist = JSON.parse(this.localStorage.getItem('wishlist'));
    }
  }

  async exportToSpreadsheet() {
    let workbook = new Workbook();

    // For each element in the wish list
    for (let wishListIndex = 0; wishListIndex < this.localWishlist.length; wishListIndex++) {
      const result = await this.fetchDataFor(this.localWishlist[wishListIndex].id);

      if (!result) {
        let worksheet = workbook.addWorksheet(this.localWishlist[wishListIndex].label);
        worksheet.columns = [
          {header: 'Empty DataModel', key: 'Empty DataModel', width:30}
        ];
        continue;
      }

      let worksheet = workbook.addWorksheet(this.localWishlist[wishListIndex].label);
      let myColumns = [];
      worksheet.columns = [];

      this.handleHiddenFields(result);

      let uniqueColumnName = this.getUniqueColumnsFromFields(result);

      // Add the column names
      uniqueColumnName.forEach(columnName => {
        myColumns.push({header: columnName, key: columnName, width:20});
      });

      // Solves an issue where, if you try to push elements to the worksheet.columns list
      // it errors when generating the file
      worksheet.columns = myColumns;

      this.printRows(result, uniqueColumnName, worksheet);
    }

    // If any of the elements of some DM need more information about justification
    // and the worksheet does not already exist.
    // Trigger fetching reference data values to add as new worksheets.
    if (this.requiresJustificationReferenceData && !workbook.getWorksheet("Justification Guidance 1")) {
      await this.addTabsWithJustificationReferenceData(workbook, "IGVariableRequirements", 1);
      await this.addTabsWithJustificationReferenceData(workbook, "SensitiveVariablesSuggestions", 2);
    }

    this.downloadAsFile(workbook)
  }

  async fetchDataFor(dataModelId: string) {
    return this.dataElementFieldsProvider.getDataElementFields(dataModelId).toPromise();
  }

  private addIfUnique(element: string, list: string[]) {
    if (list.indexOf(element) == -1) {
      list.push(element);
    }
  }

  private handleHiddenFields(result: any) {
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

  private getUniqueColumnsFromFields(result: any) {
    let uniqueColumnName: string[] = [];
    // Get a list for all the unique names for fields across all dataElements in this tab
    uniqueColumnName.push('Variable Name');
    for (let ii = 0; ii < result.length; ii++) {
      for (let jj = 0; jj < result[ii].profilesFields.length; jj++) {
        this.addIfUnique(result[ii].profilesFields[jj].fieldName, uniqueColumnName);
      }
    }
    this.addIfUnique('Request variable (Y/N)', uniqueColumnName);
    this.addIfUnique('Justification Needed (Y/N)', uniqueColumnName);
    this.addIfUnique('Justification', uniqueColumnName);

    return uniqueColumnName;
  }

  private printRows(result: any, uniqueColumnName: string[], worksheet: Worksheet) {
    // For each DE in the DM
    for (let ii = 0; ii < result.length; ii++) {
      let requiresJustification = false;
      let rowValues = [];
      // Look for the column index of the name and
      // use it to set the appropiate cell of the row
      var prefixedIndex = uniqueColumnName.indexOf('Variable Name');
      rowValues[prefixedIndex] = result[ii].dataElementLabel;

      result[ii].profilesFields.forEach(field => {
        if(
          ((field.fieldName === "Source Linkable Identifier (Y/N)")
        || (field.fieldName === "Contains free text (Y/N/unknown)")
        || (field.fieldName === "Sensitive Variable")
        || (field.fieldName === "Coded variable that may contain sensitive codes (Y/N/Unknown)"))
        &&
        (field.currentValue === "Y") || (field.currentValue === "Unknown") || (field.currentValue === "true") || (field.currentValue === true)) {
          requiresJustification = true;
          this.requiresJustificationReferenceData = true;
        }
        let index = uniqueColumnName.indexOf(field.fieldName);
        rowValues[index] = field.currentValue;
      });

      var prefixedIndex = uniqueColumnName.indexOf('Request variable (Y/N)');
      rowValues[prefixedIndex] = "";

      var prefixedIndex = uniqueColumnName.indexOf('Justification Needed (Y/N)');
      if (requiresJustification) {
        rowValues[prefixedIndex] = "Extra information is needed, please review justification guidance tabs";
      } else {
        rowValues[prefixedIndex] = "N";
      }

      var prefixedIndex = uniqueColumnName.indexOf('Justification');
      rowValues[prefixedIndex] = "If Justification Needed, please fill this.";

      worksheet.addRow(rowValues);
    }
  }

  private async addTabsWithJustificationReferenceData (workbook: Workbook, referenceDataModelName: string, index: number) {

    const referenceDataModels = await this.resourcesService.referenceDataModel.list().toPromise();

    const targets = referenceDataModels.body.items.filter(r => r.label === referenceDataModelName);

    if (!targets || targets.length < 1) {
      console.log("return 1");
      return;
    }

    // Take the first matching element if any
    let target = targets[0];

    const referenceDataValues = await this.referenceDataValueProvider.getReferenceDataValueFromId(target.id).toPromise();

    if (!referenceDataValues || referenceDataValues.length < 1) {
      console.log("return 2");
      return;
    }

   this.handleJustificationWorksheet(referenceDataValues, workbook, index);
  }

  private handleJustificationWorksheet(referenceDataValues: any, workbook: Workbook, index: number) {
    let columns = Object.keys(referenceDataValues[0]);

    let worksheet = workbook.addWorksheet("Justification Guidance " + index);
    let worksheetColumns = [];
    columns.forEach(c => {
      worksheetColumns.push({ header: c, key: c, width:20 });
    });

    worksheet.columns = worksheetColumns;

    for (let ii = 0; ii < referenceDataValues.length; ii++) {
      worksheet.addRow(referenceDataValues[ii]);
    }
  }

  private downloadAsFile(workbook: Workbook) {
    // Use the date to create a somehow unique name for the file with format:
    // DataLoch_Request_Form_<dayOfMonth>_<monthOfYear>_<fullYear>_<currentTimeHours>_<currentTimeMinutes>_<currentTimeSecs>_<currentTimeMilisecs>
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var today = new Date();

      var currentMonth: number = today.getMonth()+1
      fs.saveAs(blob, `DataLoch_Request_Form_${today.getDate()}_${currentMonth}_${today.getFullYear()}_${today.getHours()}_${today.getMinutes()}_${today.getSeconds()}_${today.getMilliseconds()}.xlsx`);
    });
  }
}