import { Component, OnInit } from '@angular/core';
import { Uuid } from '@maurodatamapper/mdm-resources'; 
import { UIRouterGlobals, UIRouter } from '@uirouter/core';

@Component({
  selector: 'mdm-data-element-page',
  templateUrl: './data-element-page.component.html',
  styleUrls: ['./data-element-page.component.scss']
})
export class DataElementPageComponent implements OnInit {
  dataModelId: Uuid;
  dataClassId: Uuid;
  id: Uuid;

  constructor(
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

    this.dataModelId = this.uiRouterGlobals.params.dataModelId;
    this.dataClassId = this.uiRouterGlobals.params.dataClassId;
    this.id = this.uiRouterGlobals.params.id;
  }

}
