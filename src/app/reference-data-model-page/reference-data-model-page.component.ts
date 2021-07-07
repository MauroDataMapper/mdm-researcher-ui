import { Component, OnInit } from '@angular/core';
import { Uuid } from '@maurodatamapper/mdm-resources'; 
import { UIRouterGlobals, UIRouter } from '@uirouter/core';

@Component({
  selector: 'reference-mdm-data-model-page',
  templateUrl: './reference-data-model-page.component.html',
  styleUrls: ['./reference-data-model-page.component.scss']
})
export class ReferenceDataModelPageComponent implements OnInit {
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
