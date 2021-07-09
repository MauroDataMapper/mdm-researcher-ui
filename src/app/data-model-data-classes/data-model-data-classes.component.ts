import { Component, OnInit, Input } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { Uuid } from '@maurodatamapper/mdm-resources'; 

@Component({
  selector: 'mdm-data-model-data-classes',
  templateUrl: './data-model-data-classes.component.html',
  styleUrls: ['./data-model-data-classes.component.scss']
})
export class DataModelDataClassesComponent implements OnInit {
  @Input() dataModelId: Uuid;

  dataClasses: any[] = [];

  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService,
    ) { }

    ngOnInit(): void {

      this.resourcesService.dataClass
      .list(this.dataModelId)
      .subscribe(async (resp) => {
        this.dataClasses = resp.body.items;
  
        this.dataLoaded = Promise.resolve(true);
  
      });
    }
}
