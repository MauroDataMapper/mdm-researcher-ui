import { Component, OnInit, Input } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { DataModelDetail, DataModelDetailResponse, CatalogueItem, ModelDomainType, Uuid } from '@maurodatamapper/mdm-resources'; 

@Component({
  selector: 'mdm-semantically-linked-data-model',
  templateUrl: './semantically-linked-data-model.component.html',
  styleUrls: ['./semantically-linked-data-model.component.scss']
})
export class SemanticallyLinkedDataModelComponent implements OnInit {
  @Input() dataModelId: Uuid;
  @Input() linkType: string;
  @Input() direction: string;
  dataModel: DataModelDetail;
  catalogueItem: CatalogueItem;
  dataLoaded: Promise<boolean>;
  

  constructor(
    private resourcesService: MdmResourcesService
    ) { }

  ngOnInit(): void {

    this.resourcesService.dataModel
      .get(this.dataModelId)
      .subscribe(async (result: DataModelDetailResponse) => {
        this.dataModel = result.body;
        this.catalogueItem = this.dataModel;

        this.dataLoaded = Promise.resolve(true);
      });
  }
}
