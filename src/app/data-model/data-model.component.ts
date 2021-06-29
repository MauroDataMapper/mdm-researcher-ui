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

        this.resourcesService.catalogueItem
          .listSemanticLinks(this.dataModel.domainType, this.dataModel.id)
          .subscribe((resp) => {
            this.semanticLinks = resp.body.items;
          });
        
          //Get all dynamic profile providers
          this.resourcesService.profileResource.usedProfiles(ModelDomainType.DataModels, this.dataModel.id)
          .subscribe((resp) => {
            resp.body.forEach((provider) => {
                this.profileProviders.push(provider);
            });

            //For each dynamic profile provider that applies to DataModel, list the profile sections in
            //this.profileSections, indexed by [provider.namespace | provider.name]
            this.profileProviders.forEach((provider) => {
              this.resourcesService.profileResource
              .profile(ModelDomainType.DataModels, this.dataModel.id, provider.namespace, provider.name)
              .subscribe((resp) => {
                this.profileSections[provider.namespace + '|' + provider.name] = resp.body.sections;
              });
            });
          });

        this.dataLoaded = Promise.resolve(true);
      });
  }

}
