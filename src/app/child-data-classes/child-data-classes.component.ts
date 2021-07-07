import { Component, OnInit, Input } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { Uuid } from '@maurodatamapper/mdm-resources'; 

@Component({
  selector: 'mdm-child-data-classes',
  templateUrl: './child-data-classes.component.html',
  styleUrls: ['./child-data-classes.component.scss']
})
export class ChildDataClassesComponent implements OnInit {
  @Input() dataModelId: Uuid;
  @Input() dataClassId: Uuid;

  childDataClasses: any[] = [];

  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService,
    ) { }

  ngOnInit(): void {

    this.resourcesService.dataClass
    .listChildDataClasses(this.dataModelId, this.dataClassId)
    .subscribe(async (resp) => {
      this.childDataClasses = resp.body.items;

      this.dataLoaded = Promise.resolve(true);

    });
  }
}
