import { Component, OnInit } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { DataClassDetail, DataClassDetailResponse, CatalogueItem, ModelDomainType, Uuid } from '@maurodatamapper/mdm-resources'; 
import { UIRouterGlobals, UIRouter, any } from '@uirouter/core';

@Component({
  selector: 'mdm-child-data-class',
  templateUrl: './child-data-class.component.html',
  styleUrls: ['./child-data-class.component.scss']
})
export class ChildDataClassComponent implements OnInit {
  dataClass: DataClassDetail;
  catalogueItem: CatalogueItem;

  dataElements: any[] = [];
  id: Uuid;
  parentDataClassId: Uuid;
  dataModelId: string;
  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService,
    private uiRouterGlobals: UIRouterGlobals,
    private router: UIRouter
    ) { }

  ngOnInit(): void {
    if (!this.uiRouterGlobals.params.id 
      || !this.uiRouterGlobals.params.parentDataClassId
      || !this.uiRouterGlobals.params.dataModelId) {
      this.router.stateService.go('app.container.notFound');
      return;
    }

    this.id = this.uiRouterGlobals.params.id;
    this.parentDataClassId = this.uiRouterGlobals.params.parentDataClassId;
    this.dataModelId = this.uiRouterGlobals.params.dataModelId;

    this.resourcesService.dataClass
      .getChildDataClass(this.dataModelId, this.parentDataClassId, this.id)
      .subscribe(async (result: DataClassDetailResponse) => {
        this.dataClass = result.body;
        this.catalogueItem = this.dataClass;
        
        this.dataLoaded = Promise.resolve(true);

    });
  }

}
