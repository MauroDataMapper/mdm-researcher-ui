import { Component, OnInit, Input } from '@angular/core';
import { MdmResourcesService } from '@mdm/services/mdm-resources/mdm-resources.service';
import { ReferenceDataModelDetail, ReferenceDataModelDetailResponse, Uuid } from '@maurodatamapper/mdm-resources'; 

@Component({
  selector: 'mdm-reference-data-model',
  templateUrl: './reference-data-model.component.html',
  styleUrls: ['./reference-data-model.component.scss']
})
export class ReferenceDataModelComponent implements OnInit {

  @Input() id: Uuid;
  referenceDataModel: ReferenceDataModelDetail;
  dataLoaded: Promise<boolean>;

  constructor(
    private resourcesService: MdmResourcesService
    ) { }

  ngOnInit(): void {

    this.resourcesService.referenceDataModel
      .get(this.id)
      .subscribe(async (result: ReferenceDataModelDetailResponse) => {
        this.referenceDataModel = result.body;
        this.dataLoaded = Promise.resolve(true);
      });
  }
}
