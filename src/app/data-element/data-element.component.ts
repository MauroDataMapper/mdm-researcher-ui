import { Component, OnInit } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { DataElementDetail, DataElementDetailResponse, ModelDomainType } from '@maurodatamapper/mdm-resources'; 
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
  semanticLinks: any[] = [];
  profileProviders: any[] = [];
  profileSections: any[] = [];  
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

        this.resourcesService.catalogueItem
          .listSemanticLinks(this.dataElement.domainType, this.dataElement.id)
          .subscribe((resp) => {
            this.semanticLinks = resp.body.items;
          });
        
          //Get all dynamic profile providers
          this.resourcesService.profileResource.providerDynamic()
          .subscribe((resp) => {
            resp.body.forEach((provider) => {
              //if dynamic profile provider applies to DataElement then keep it
              if (provider.domains.includes("DataElement")) {
                this.profileProviders.push(provider);
              }
            });

            //For each dynamic profile provider that applies to DataModel, list the profile sections in
            //this.profileSections, indexed by [provider.namespace | provider.name]
            this.profileProviders.forEach((provider) => {
              this.resourcesService.profileResource
              .profile("dataElements", this.dataElement.id, provider.namespace, provider.name)
              .subscribe((resp) => {
                this.profileSections[provider.namespace + '|' + provider.name] = resp.body.sections;
              });
            });
          });

        this.dataLoaded = Promise.resolve(true);
      });
  }

}
