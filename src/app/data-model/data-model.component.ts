import { Component, OnInit } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { DataModelDetail, DataModelDetailResponse, CatalogueItem, ModelDomainType } from '@maurodatamapper/mdm-resources'; 
import { UIRouterGlobals, UIRouter } from '@uirouter/core';

@Component({
  selector: 'mdm-data-model',
  templateUrl: './data-model.component.html',
  styleUrls: ['./data-model.component.scss']
})
export class DataModelComponent implements OnInit {
  dataModel: DataModelDetail;
  catalogueItem: CatalogueItem;
  dataModelId: string;
  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService,
    private uiRouterGlobals: UIRouterGlobals,
    private router: UIRouter
    ) { }

  ngOnInit(): void {
    if (!this.uiRouterGlobals.params.id) {
      this.router.stateService.go('app.container.notFound');
      return;
    }

    this.dataModelId = this.uiRouterGlobals.params.id

    this.resourcesService.dataModel
      .get(this.dataModelId)
      .subscribe(async (result: DataModelDetailResponse) => {
        this.dataModel = result.body;
        this.catalogueItem = this.dataModel;

        this.dataLoaded = Promise.resolve(true);
      });
  }

}
