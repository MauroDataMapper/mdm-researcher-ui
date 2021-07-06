import { Component, OnInit, Input } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { DataModelDetail, DataModelDetailResponse, CatalogueItem, ModelDomainType, Uuid } from '@maurodatamapper/mdm-resources'; 
import { catalogueItem } from '@shared/shared-classes';

@Component({
  selector: 'mdm-data-model',
  templateUrl: './data-model.component.html',
  styleUrls: ['./data-model.component.scss']
})
export class DataModelComponent implements OnInit {

  @Input() id: Uuid;
  @Input() page: boolean;
  @Input() linkType: string;
  @Input() direction: string;  
  @Input() semanticLink: any;
  dataModel: DataModelDetail;
  catalogueItem: catalogueItem;
  CatalogueItem: CatalogueItem;
  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService
    ) { }

  ngOnInit(): void {

    this.resourcesService.dataModel
      .get(this.id)
      .subscribe(async (result: DataModelDetailResponse) => {
        this.dataModel = result.body;
        this.CatalogueItem = this.dataModel;

        this.catalogueItem = new catalogueItem();
        this.catalogueItem.id = this.dataModel.id;
        this.catalogueItem.domainType = 'DataModel';
        this.catalogueItem.label = this.dataModel.label;
        this.catalogueItem.model = this.dataModel.model;
        this.catalogueItem.breadcrumbs = this.dataModel.breadcrumbs;
        this.catalogueItem.description = this.dataModel.description;

        this.dataLoaded = Promise.resolve(true);
      });
  }

}
