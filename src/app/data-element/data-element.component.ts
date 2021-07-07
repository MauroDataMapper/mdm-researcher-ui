import { Component, OnInit, Input } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { DataElementDetail, DataElementDetailResponse, ModelDomainType, Uuid } from '@maurodatamapper/mdm-resources'; 
import { catalogueItem } from '@shared/shared-classes';

@Component({
  selector: 'mdm-data-element',
  templateUrl: './data-element.component.html',
  styleUrls: ['./data-element.component.scss']
})
export class DataElementComponent implements OnInit {
  @Input() dataModelId: Uuid;
  @Input() dataClassId: Uuid;
  @Input() id: Uuid;
  @Input() page: boolean;
  @Input() linkType: string;
  @Input() direction: string;  
  @Input() semanticLink: any;

  catalogueItem: catalogueItem;
  dataElement: DataElementDetail;

  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService
  ) { }

  ngOnInit(): void {


    this.resourcesService.dataElement
      .get(this.dataModelId, this.dataClassId, this.id)
      .subscribe((result: DataElementDetailResponse) => {
        this.dataElement = result.body;

        this.catalogueItem = new catalogueItem();
        this.catalogueItem.id = this.dataElement.id;
        this.catalogueItem.domainType = 'DataElement';
        this.catalogueItem.label = this.dataElement.label;
        this.catalogueItem.model = this.dataElement.model;
        this.catalogueItem.breadcrumbs = this.dataElement.breadcrumbs;
        this.catalogueItem.description = this.dataElement.description;

        this.dataLoaded = Promise.resolve(true);
      });
  }

}
