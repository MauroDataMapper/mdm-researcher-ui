import { Component, OnInit, Input } from '@angular/core';
//import { catalogueItem } from '@shared/shared-classes';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { ModelDomainType, Uuid, CatalogueItem } from '@maurodatamapper/mdm-resources'; 
import { getMatInputUnsupportedTypeError } from '@angular/material/input';

@Component({
  selector: 'mdm-semantically-linked-items',
  templateUrl: './semantically-linked.component.html',
  styleUrls: ['./semantically-linked.component.scss']
})
export class SemanticallyLinkedComponent implements OnInit {
  @Input() item: CatalogueItem;
  @Input() domainType: string;
  @Input() show: string;

  semanticLinks: any[] = [];
  semanticLinksForWhichThisIsTarget: any[] = [];
  semanticLinksForWhichThisIsSource: any[] = [];

  constructor(
    private resourcesService: MdmResourcesService
  ) { }

  ngOnInit(): void {

    this.resourcesService.catalogueItem
    .listSemanticLinks(this.domainType, this.item.id)
    .subscribe((resp) => {
      this.semanticLinks = resp.body.items;

      this.semanticLinks.forEach((link) => {
        if (this.show == "targets" && this.item.id == link.sourceMultiFacetAwareItem.id) {
          this.semanticLinksForWhichThisIsSource.push(link);
        }
        if (this.show == "sources" && this.item.id == link.targetMultiFacetAwareItem.id) {
          this.semanticLinksForWhichThisIsTarget.push(link);
        }
      });
    });


  }

  toDataModel(domainType): boolean {
    return domainType === "DataModel";
  }

  toDataClass(domainType): boolean {
    return domainType === "DataClass";
  }  

  toDataElement(domainType): boolean {
    return domainType === "DataElement";
  }   
}