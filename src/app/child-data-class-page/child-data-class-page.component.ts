import { Component, OnInit } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { DataClassDetail, DataClassDetailResponse, CatalogueItem, ModelDomainType, Uuid } from '@maurodatamapper/mdm-resources'; 
import { UIRouterGlobals, UIRouter, any } from '@uirouter/core';

@Component({
  selector: 'mdm-child-data-class-page',
  templateUrl: './child-data-class-page.component.html',
  styleUrls: ['./child-data-class-page.component.scss']
})
export class ChildDataClassPageComponent implements OnInit {
  dataModelId: Uuid;
  parentDataClassId: Uuid;
  id: Uuid;
  
  constructor(
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

    this.dataModelId = this.uiRouterGlobals.params.dataModelId;
    this.parentDataClassId = this.uiRouterGlobals.params.parentDataClassId;
    this.id = this.uiRouterGlobals.params.id;
  }
}
