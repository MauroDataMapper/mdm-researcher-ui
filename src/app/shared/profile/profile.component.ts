import { Component, OnInit, Input } from '@angular/core';
import { environment } from '@env/environment';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { CatalogueItem } from '@maurodatamapper/mdm-resources'; 

@Component({
  selector: 'mdm-item-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() item: CatalogueItem;
  @Input() domainType: string;

  profileProviders: any[] = [];
  profileSections: any[] = [];

  constructor(
    private resourcesService: MdmResourcesService
  ) { }

 ngOnInit(): void {

    //Get used dynamic profile providers
    this.resourcesService.profileResource.usedProfiles(this.domainType, this.item.id)
    .subscribe((resp) => {
      this.profileProviders = resp.body.sort(this.compareProvider);
      this.profileProviders.forEach((provider) => {
        this.getProfileSections(this.domainType, this.item.id, provider);
      });
    });
  }


  private async getProfileSections(domainType, id, provider): Promise<any> {
    let dataLoaded: Promise<boolean>;

    /*
     * Sort sections within a profile provider
     */
    let comparer = function(a, b){
      let iProfile = environment.profileProviderOrder.indexOf(provider.name);

      if (iProfile > -1) {
        let sectionOrder = environment.profileSectionOrder[iProfile];
        let ia = sectionOrder.indexOf(a.sectionName);
        let ib = sectionOrder.indexOf(b.sectionName);

        if ( ia < ib ){
          return -1;
        }
        if ( ia > ib ){
          return 1;
        }
      }
      return 0;
    };
    this.resourcesService.profileResource
    .profile(domainType, id, provider.namespace, provider.name)
    .subscribe((resp) => {
      provider.profileSections = resp.body.sections.sort(comparer);
      dataLoaded = Promise.resolve(true);
    });

    return dataLoaded;
  }

  /**
   * Sort profile providers by the order in environment.profileProviderOrder
   * @param a A profile provider
   * @param b A profiole provider
   * @returns Comparison result
   */
  private compareProvider(a, b) {
    let ia = environment.profileProviderOrder.indexOf(a.name);
    let ib = environment.profileProviderOrder.indexOf(b.name);

    if ( ia < ib ){
      return -1;
    }
    if ( ia > ib ){
      return 1;
    }

    return 0;
  }
}
