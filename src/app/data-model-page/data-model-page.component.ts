import { Component, OnInit } from '@angular/core';
import { Uuid } from '@maurodatamapper/mdm-resources'; 
import { UIRouterGlobals, UIRouter } from '@uirouter/core';

@Component({
  selector: 'mdm-data-model-page',
  templateUrl: './data-model-page.component.html',
  styleUrls: ['./data-model-page.component.scss']
})
export class DataModelPageComponent implements OnInit {
  id: Uuid;

  constructor(
    private uiRouterGlobals: UIRouterGlobals,
    private router: UIRouter
    ) { }

  ngOnInit(): void {
    if (!this.uiRouterGlobals.params.id) {
      this.router.stateService.go('app.container.notFound');
      return;
    }

    this.id = this.uiRouterGlobals.params.id

  }

}
