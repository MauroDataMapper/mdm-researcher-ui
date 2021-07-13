import { Component, OnInit, Input } from '@angular/core';
import { CatalogueItem } from '@maurodatamapper/mdm-resources'; 
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';

@Component({
  selector: 'mdm-item-profile-section-contents',
  templateUrl: './profile-section-contents.component.html',
  styleUrls: ['./profile-section-contents.component.scss']
})
export class ProfileSectionContentsComponent implements OnInit {
  @Input() item: CatalogueItem;
  @Input() domainType: string;
  @Input() providerNamespace: string;
  @Input() providerName: string;
  @Input() sectionName: string;

  section: any;

  constructor(
    private resourcesService: MdmResourcesService
  ) { }

  ngOnInit(): void {
    this.resourcesService.profileResource
    .profile(this.domainType, this.item.id, this.providerNamespace, this.providerName)
    .subscribe((resp) => {
      resp.body.sections.forEach((possibleSection) => {
          if (possibleSection.sectionName === this.sectionName) {
            this.section = possibleSection;
          }
      });
    });
  }
}
