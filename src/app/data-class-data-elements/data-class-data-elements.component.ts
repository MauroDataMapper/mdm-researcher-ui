import { Component, OnInit, Input } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { Uuid } from '@maurodatamapper/mdm-resources'; 

@Component({
  selector: 'mdm-data-class-data-elements',
  templateUrl: './data-class-data-elements.component.html',
  styleUrls: ['./data-class-data-elements.component.scss']
})
export class DataClassDataElementsComponent implements OnInit {
  @Input() dataModelId: Uuid;
  @Input() dataClassId: Uuid;

  dataElements: any[] = [];

  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService,
    ) { }

  ngOnInit(): void {

    this.resourcesService.dataElement
    .list(this.dataModelId, this.dataClassId)
    .subscribe(async (resp) => {
      this.dataElements = resp.body.items;
      this.dataLoaded = Promise.resolve(true);
    });
  }
}
