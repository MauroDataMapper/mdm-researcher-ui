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

      this.dataElementFieldsProvider.handleHiddenFields(result);

      let uniqueColumnName = this.dataElementFieldsProvider.getUniqueColumnsFromFields(result, ['Variable Name'], ['Request variable (Y/N)', 'Justification Needed (Y/N)', 'Justification']);

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