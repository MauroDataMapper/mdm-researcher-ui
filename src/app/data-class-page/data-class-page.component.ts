import { Component, OnInit } from '@angular/core';
import { Uuid } from '@maurodatamapper/mdm-resources'; 
import { UIRouterGlobals, UIRouter, any } from '@uirouter/core';

@Component({
  selector: 'mdm-data-class-page',
  templateUrl: './data-class-page.component.html',
  styleUrls: ['./data-class-page.component.scss']
})
export class DataClassPageComponent implements OnInit {
  dataModelId: Uuid;
  id: Uuid;

  constructor(
    private uiRouterGlobals: UIRouterGlobals,
    private router: UIRouter
    ) { }

  ngOnInit(): void {
    if (!this.uiRouterGlobals.params.id 
      || !this.uiRouterGlobals.params.dataModelId) {
      this.router.stateService.go('app.container.notFound');
      return;
    }

    this.dataModelId = this.uiRouterGlobals.params.dataModelId;
    this.id = this.uiRouterGlobals.params.id;
  }
}
