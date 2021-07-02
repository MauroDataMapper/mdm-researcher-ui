import { Component, OnInit } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { DataClassDetail, DataClassDetailResponse, CatalogueItem, ModelDomainType } from '@maurodatamapper/mdm-resources'; 
import { UIRouterGlobals, UIRouter, any } from '@uirouter/core';

@Component({
  selector: 'mdm-data-class',
  templateUrl: './data-class.component.html',
  styleUrls: ['./data-class.component.scss']
})
export class DataClassComponent implements OnInit {
  dataClass: DataClassDetail;
  catalogueItem: CatalogueItem;
  childDataClasses: any[] = [];
  dataElements: any[] = [];
  id: string;
  dataModelId: string;
  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService,
    private uiRouterGlobals: UIRouterGlobals,
    private router: UIRouter
    ) { }

  ngOnInit(): void {
    if (!this.uiRouterGlobals.params.id 
      || !this.uiRouterGlobals.params.dataModelId) {
      this.router.stateService.go('app.container.notFound');
      return;
    }

    this.id = this.uiRouterGlobals.params.id;
    this.dataModelId = this.uiRouterGlobals.params.dataModelId;

    this.resourcesService.dataClass
      .get(this.dataModelId, this.id)
      .subscribe(async (result: DataClassDetailResponse) => {
        this.dataClass = result.body;
        this.catalogueItem = this.dataClass;

        this.resourcesService.dataClass
        .listChildDataClasses(this.dataModelId, this.id)
        .subscribe(async (result) => {
          this.childDataClasses = result.body.items;

          this.dataLoaded = Promise.resolve(true);
        });


      });
  }

}
