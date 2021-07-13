import { Component, OnInit, Input } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { CatalogueItem } from '@maurodatamapper/mdm-resources'; 

@Component({
  selector: 'mdm-item-profile-short',
  templateUrl: './profile-short.component.html',
  styleUrls: ['./profile-short.component.scss']
})
export class ProfileShortComponent implements OnInit {
  @Input() item: CatalogueItem;
  @Input() domainType: string;

  profileProviders: any[] = [];
  profileSections: any[] = [];

  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService
  ) { }

  ngOnInit(): void {

    //Get used dynamic profile providers
    this.resourcesService.profileResource.usedProfiles(this.domainType, this.item.id)
    .subscribe((resp) => {
      resp.body.forEach((provider) => {
          this.profileProviders.push(provider);
      });

      //For each dynamic profile provider that applies this item, list the profile sections in
      //this.profileSections, indexed by [provider.namespace | provider.name]
      this.profileProviders.forEach((provider) => {
        this.resourcesService.profileResource
        .profile(this.domainType, this.item.id, provider.namespace, provider.name)
        .subscribe((resp) => {
          this.profileSections[provider.namespace + '|' + provider.name] = resp.body.sections;
          this.dataLoaded = Promise.resolve(true);
        });
      });
    });
  }

  /**
   * 
   * @param field If section contains a field called _hidden, and if that field's value contains 
   * field.fieldName in a semi colon separated string, return false. Or, if field.fieldName === '_hidden'
   * then return false.
   * Else return true.
   * @param field A field whose visibility we want to determine
   * @param section The section containing the field, and possibly also another field called _hidden
   * @returns boolean
   */
  displayField(field, section): boolean {
    if (field.fieldName === '_hidden') {
      return false;
    }

    var _hidden = "";
    section.fields.forEach((sectionField) => {      
      if (sectionField.fieldName === '_hidden') {
        _hidden = sectionField.currentValue;
      }
    });

    var _hiddenArray = _hidden.split(";").map(function(item) {
      return item.trim();
    });

    if (_hiddenArray.includes(field.fieldName)) {
      return false;
    }

    return true;
  }
}