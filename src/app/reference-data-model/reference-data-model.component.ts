import { Component, OnInit, Input } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { ReferenceDataModelDetail, ReferenceDataModelDetailResponse, CatalogueItem, ModelDomainType, Uuid } from '@maurodatamapper/mdm-resources'; 
import { catalogueItem } from '@shared/shared-classes';

@Component({
  selector: 'mdm-reference-data-model',
  templateUrl: './reference-data-model.component.html',
  styleUrls: ['./reference-data-model.component.scss']
})
export class ReferenceDataModelComponent implements OnInit {

  @Input() id: Uuid;
  @Input() page: boolean;
  @Input() linkType: string;
  @Input() direction: string;  
  @Input() semanticLink: any;
  referenceDataModel: ReferenceDataModelDetail;
  catalogueItem: catalogueItem;
  CatalogueItem: CatalogueItem;
  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService
    ) { }

  ngOnInit(): void {

    this.resourcesService.referenceDataModel
      .get(this.id)
      .subscribe(async (result: ReferenceDataModelDetailResponse) => {
        this.referenceDataModel = result.body;
        this.CatalogueItem = this.referenceDataModel;

        this.catalogueItem = new catalogueItem();
        this.catalogueItem.id = this.referenceDataModel.id;
        this.catalogueItem.domainType = 'ReferenceDataModel';
        this.catalogueItem.label = this.referenceDataModel.label;
        this.catalogueItem.model = this.referenceDataModel.model;
        this.catalogueItem.breadcrumbs = this.referenceDataModel.breadcrumbs;
        this.catalogueItem.description = this.referenceDataModel.description;

        this.dataLoaded = Promise.resolve(true);
      });
  }

}
