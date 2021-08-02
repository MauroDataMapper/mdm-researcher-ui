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
      resp.body.forEach((provider) => {
        this.resourcesService.profileResource
        .profile(this.domainType, this.item.id, provider.namespace, provider.name)
        .subscribe((resp) => {
          this.profileSections.push(resp.body.sections.sort(this.compare));
        });
      });
    });
  }

  /**
   * 
   * @param a A profile section
   * @param b A profile section
   * @returns -1, 0 or 1 Comparison to sort by the desired order by sectionName
   */
  private compare(a, b) {
    let ia = environment.profileSectionOrder.indexOf(a.sectionName);
    let ib = environment.profileSectionOrder.indexOf(b.sectionName);

    if ( ia < ib ){
      return -1;
    }
    if ( ia > ib ){
      return 1;
    }
    return 0;
  }
}
