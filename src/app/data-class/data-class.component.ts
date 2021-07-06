import { Component, OnInit, Input } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { CatalogueItem, DataClassDetail, DataClassDetailResponse, Uuid } from '@maurodatamapper/mdm-resources'; 
import { catalogueItem } from '@shared/shared-classes';

@Component({
  selector: 'mdm-data-class',
  templateUrl: './data-class.component.html',
  styleUrls: ['./data-class.component.scss']
})
export class DataClassComponent implements OnInit {
  @Input() dataModelId: Uuid;
  @Input() parentDataClassId: Uuid;
  @Input() id: Uuid;
  @Input() page: boolean;
  @Input() linkType: string;
  @Input() direction: string;  
  @Input() semanticLink: any;

  dataClass: DataClassDetail;
  catalogueItem: catalogueItem;

  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService,
    ) { }

  ngOnInit(): void {
    this.doInit();
  }

  doInit(): void {

    if (this.parentDataClassId) {
      this.resourcesService.dataClass
      .getChildDataClass(this.dataModelId, this.parentDataClassId, this.id)
      .subscribe(async (result: DataClassDetailResponse) => {
        this.dataClass = result.body;
        
        this.catalogueItem = new catalogueItem();
        this.catalogueItem.id = this.dataClass.id;
        this.catalogueItem.domainType = 'DataClass';
        this.catalogueItem.label = this.dataClass.label;
        this.catalogueItem.model = this.dataClass.model;
        this.catalogueItem.breadcrumbs = this.dataClass.breadcrumbs;
        this.catalogueItem.description = this.dataClass.description;
        
        this.dataLoaded = Promise.resolve(true);

      });
    } else {
      this.resourcesService.dataClass
      .get(this.dataModelId, this.id)
      .subscribe(async (result: DataClassDetailResponse) => {
        this.dataClass = result.body;

        this.catalogueItem = new catalogueItem();
        this.catalogueItem.id = this.dataClass.id;
        this.catalogueItem.domainType = 'DataClass';
        this.catalogueItem.label = this.dataClass.label;
        this.catalogueItem.model = this.dataClass.model;
        this.catalogueItem.breadcrumbs = this.dataClass.breadcrumbs;
        this.catalogueItem.description = this.dataClass.description;


        this.dataLoaded = Promise.resolve(true);
      });
    }

  }

}
