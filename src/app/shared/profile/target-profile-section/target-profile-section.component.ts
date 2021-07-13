import { Component, OnInit, Input } from '@angular/core';
import { CatalogueItem } from '@maurodatamapper/mdm-resources'; 
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';

@Component({
  selector: 'mdm-target-profile-section',
  templateUrl: './target-profile-section.component.html',
  styleUrls: ['./target-profile-section.component.scss']
})
export class TargetProfileSectionComponent implements OnInit {
  @Input() item: CatalogueItem;
  @Input() domainType: string;
  @Input() providerNamespace: string;
  @Input() providerName: string;
  @Input() sectionName: string;

  semanticLinks: any[] = [];
  //section: any;

  dataLoaded: Promise<boolean>;


  constructor(
    private resourcesService: MdmResourcesService
  ) { }

  //Get things to which this item has created semantic links, and then get their profile sections
  ngOnInit(): void {
    this.resourcesService.catalogueItem
    .listSemanticLinks(this.domainType, this.item.id)
    .subscribe((resp) => {
      this.semanticLinks = resp.body.items;
      this.dataLoaded = Promise.resolve(true);
    });
  }
}
