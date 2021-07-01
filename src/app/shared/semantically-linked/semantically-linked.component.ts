import { Component, OnInit, Input } from '@angular/core';
//import { catalogueItem } from '@shared/shared-classes';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { ModelDomainType, Uuid, CatalogueItem } from '@maurodatamapper/mdm-resources'; 

@Component({
  selector: 'mdm-semantically-linked-items',
  templateUrl: './semantically-linked.component.html',
  styleUrls: ['./semantically-linked.component.scss']
})
export class SemanticallyLinkedComponent implements OnInit {
  @Input() item: CatalogueItem;
  @Input() domainType: string;

  semanticLinks: any[] = [];

  constructor(
    private resourcesService: MdmResourcesService
  ) { }

  ngOnInit(): void {

    this.resourcesService.catalogueItem
    .listSemanticLinks(this.domainType, this.item.id)
    .subscribe((resp) => {
      this.semanticLinks = resp.body.items;
    });
  }

}