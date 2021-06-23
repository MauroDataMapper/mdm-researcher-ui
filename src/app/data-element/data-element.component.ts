import { Component, OnInit } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { DataElementDetail, DataElementDetailResponse } from '@maurodatamapper/mdm-resources'; 
import { UIRouterGlobals, UIRouter } from '@uirouter/core';

@Component({
  selector: 'mdm-data-element',
  templateUrl: './data-element.component.html',
  styleUrls: ['./data-element.component.scss']
})
export class DataElementComponent implements OnInit {
  dataElement: DataElementDetail;
  dataModelId: string;
  dataClassId: string;
  id: string;
  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService,
    private uiRouterGlobals: UIRouterGlobals,
    private router: UIRouter
  ) { }

  ngOnInit(): void {
    if (!this.uiRouterGlobals.params.id 
      || !this.uiRouterGlobals.params.dataModelId
      || !this.uiRouterGlobals.params.dataClassId) {
      this.router.stateService.go('app.container.notFound');
      return;
    }

    this.id = this.uiRouterGlobals.params.id;
    this.dataModelId = this.uiRouterGlobals.params.dataModelId;
    this.dataClassId = this.uiRouterGlobals.params.dataClassId;

    this.resourcesService.dataElement
      .get(this.dataModelId, this.dataClassId, this.id)
      .subscribe((result: DataElementDetailResponse) => {
        this.dataElement = result.body;
        this.dataLoaded = Promise.resolve(true);
      });
  }

}
