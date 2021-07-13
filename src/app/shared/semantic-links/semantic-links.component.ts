import { Component, OnInit, Input } from '@angular/core';
//import { catalogueItem } from '@shared/shared-classes';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { ModelDomainType, Uuid, CatalogueItem } from '@maurodatamapper/mdm-resources'; 
import { getMatInputUnsupportedTypeError } from '@angular/material/input';

@Component({
  selector: 'mdm-semantic-links',
  templateUrl: './semantic-links.component.html',
  styleUrls: ['./semantic-links.component.scss']
})
export class SemanticLinksComponent implements OnInit {
  @Input() item: CatalogueItem;
  @Input() domainType: string;

  semanticLinks: any[] = [];
  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService
  ) { }

  ngOnInit(): void {

    this.resourcesService.catalogueItem
    .listSemanticLinks(this.domainType, this.item.id)
    .subscribe((resp) => {
      this.semanticLinks = resp.body.items;
      this.dataLoaded = Promise.resolve(true);
    });
  } 
}
