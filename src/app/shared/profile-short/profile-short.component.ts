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
        });
      });
    });
  }

}