import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { catalogueItem } from '@mdm/shared/shared-classes';
import { LocalStorageHandlerService } from '@mdm/services/local-storage/local-storage-handler.service';
import { DataElementFieldsProviderService } from '@mdm/services/data-providers/data-element-fields-provider.service';

@Component({
  selector: 'mdm-download-wishlist',
  templateUrl: './download-wishlist.component.html',
  styleUrls: ['./download-wishlist.component.scss']
})
export class DownloadWishlistComponent implements OnInit {

  localWishlist: catalogueItem[] = [];

  constructor(
    private localStorage: LocalStorageHandlerService,
    private dataElementFieldsProvider: DataElementFieldsProviderService,
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
  
      // Add the column names
      uniqueColumnName.forEach(columnName => {
        myColumns.push({header: columnName, key: columnName, width:20});
      });
  
      // Solves an issue where, if you try to push elements to the worksheet.columns list
      // it errors when generating the file
      worksheet.columns = myColumns;
  
      // For each DE in the DM
      for (let ii = 0; ii < result.length; ii++) {
        let rowValues = [];
        // Look for the column index of the name and
        // use it to set the appropiate cell of the row
        var prefixedIndex = uniqueColumnName.indexOf('Variable Name');
        rowValues[prefixedIndex] = result[ii].dataElementLabel;
  
        result[ii].profilesFields.forEach(field => {
          let index = uniqueColumnName.indexOf(field.fieldName);
          rowValues[index] = field.currentValue;
        });
  
        var prefixedIndex = uniqueColumnName.indexOf('Request variable (Y/N)');
        rowValues[prefixedIndex] = "";
        var prefixedIndex = uniqueColumnName.indexOf('Justification Needed (Y/N)');
        rowValues[prefixedIndex] = "";
        var prefixedIndex = uniqueColumnName.indexOf('Justification');
        rowValues[prefixedIndex] = "If Justification Needed, please fill this.";

        worksheet.addRow(rowValues);
      }
    }

    // Use the date to create a somehow unique name for the file with format:
    // DataLoch_Request_Form_<dayOfMonth>_<monthOfYear>_<fullYear>_<currentTimeHours>_<currentTimeMinutes>_<currentTimeSecs>_<currentTimeMilisecs>
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var today = new Date();

      var currentMonth: number = today.getMonth()+1
      fs.saveAs(blob, `DataLoch_Request_Form_${today.getDate()}_${currentMonth}_${today.getFullYear()}_${today.getHours()}_${today.getMinutes()}_${today.getSeconds()}_${today.getMilliseconds()}.xlsx`);
    });
  }

  async fetchDataFor(dataModelId: string) {
    return this.dataElementFieldsProvider.getDataElementFields(dataModelId).toPromise();
  }

  private addIfUnique(element: string, list: string[]) {
    if (list.indexOf(element) == -1) {
      list.push(element);
    }
  }
}