import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { catalogueItem } from '@mdm/shared/shared-classes';
import { LocalStorageHandlerService } from '@mdm/services/local-storage/local-storage-handler.service';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { DataModelDetailResponse, ModelDomainType } from '@maurodatamapper/mdm-resources'; 
import { Field, Provider, Section, WishlistDownloadElement } from '@mdm/models/wishlist-download-element';

@Component({
  selector: 'mdm-download-wishlist',
  templateUrl: './download-wishlist.component.html',
  styleUrls: ['./download-wishlist.component.scss']
})
export class DownloadWishlistComponent implements OnInit {

  localWishlist: catalogueItem[] = [];
  wishlistDownloads: WishlistDownloadElement[] = [];

  constructor(
    private localStorage: LocalStorageHandlerService,
    private resourcesService: MdmResourcesService,
  ) { }

  ngOnInit(): void {
    if (this.localStorage.containsKey('wishlist')) {
      this.localWishlist = JSON.parse(this.localStorage.getItem('wishlist'));
    }
  }

  exportToSpreadsheet(): void {
    this.fetchData(); 

    // Create a new workbook
    let workbook = new Workbook();

    for (let _wishListDownloadElement of this.wishlistDownloads) {
      var wishListDownloadElement: WishlistDownloadElement = _wishListDownloadElement;

      // Add a new tab for each item the wishlist using the label as name
      let worksheet = workbook.addWorksheet(wishListDownloadElement.label);

      // Columns of the tab
      worksheet.columns = [
        {header: 'Variable Name', key: 'variableName'},
        {header: 'Description', key: 'description'},
        {header: 'Current Value', key: 'currentValue'},
        {header: 'Request variable (Y/N)', key: 'requestVariable'},
        {header: 'Justification Needed (Y/N)', key: 'justificationNeeded'},
        {header: 'Justification', key: 'justification'}
      ];

      // Add 1 row for each section of each profile
      for (let _provider of wishListDownloadElement.profileProviders) {
        var provider : Provider = _provider;
        for (let _section of wishListDownloadElement.profileSections[`${provider.namespace}|${provider.name}`]) {
          var section: Section = _section;
          if (section.fields.length > 0) {
            for (let _field of section.fields) {
              var field: Field = _field;
              worksheet.addRow({
                variableName: field.fieldName,
                description: field.description,
                currentValue: field.currentValue,
                requestVariable: "",
                justificationNeeded: "",
                justification: ""
              });
            }
          }
        }
      }
    }

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var today = new Date();

      fs.saveAs(blob, `DataLoch_Request_Form_${today.getDay()}_
      ${today.getMonth() + 1}_${today.getFullYear()}_${today.getHours()}_
      ${today.getMinutes()}_${today.getMilliseconds()}.xlsx`);
    });
  }

  fetchData(){
    for (let ii = 0; ii < this.localWishlist.length; ii++) {
      let wishlistElement = new WishlistDownloadElement();
      wishlistElement.label = this.localWishlist[ii].label;

      this.resourcesService.dataModel
      .get(this.localWishlist[ii].id)
      .subscribe(async (result: DataModelDetailResponse) => {
          wishlistElement.catalogueItem = result.body;

          //Get all dynamic profile providers
          this.resourcesService.profileResource.usedProfiles(ModelDomainType.DataModels, wishlistElement.catalogueItem.id)
          .subscribe((resp) => {
            resp.body.forEach((provider) => {
              wishlistElement.profileProviders.push(provider);
            });

          //For each dynamic profile provider that applies to DataModel, list the profile sections in
          //indexed by [provider.namespace | provider.name]
          wishlistElement.profileProviders.forEach((provider) => {
            this.resourcesService.profileResource
            .profile(ModelDomainType.DataModels, wishlistElement.catalogueItem.id, provider.namespace, provider.name)
            .subscribe((resp) => {
              wishlistElement.profileSections[provider.namespace + '|' + provider.name] = resp.body.sections;
            });
          });

          this.wishlistDownloads.push(wishlistElement);
        });
      });
    }
  }
}