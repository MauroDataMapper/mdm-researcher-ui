import { Component, OnInit, Input } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { Uuid } from '@maurodatamapper/mdm-resources'; 

@Component({
  selector: 'mdm-data-class-data-classes',
  templateUrl: './data-class-data-classes.component.html',
  styleUrls: ['./data-class-data-classes.component.scss']
})
export class DataClassDataClassesComponent implements OnInit {
  @Input() dataModelId: Uuid;
  @Input() dataClassId: Uuid;

  dataClasses: any[] = [];

  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService,
    ) { }

    ngOnInit(): void {

      this.resourcesService.dataClass
      .listChildDataClasses(this.dataModelId, this.dataClassId)
      .subscribe(async (resp) => {
        this.dataClasses = resp.body.items;
  
        this.dataLoaded = Promise.resolve(true);
  
      });
    }
}
