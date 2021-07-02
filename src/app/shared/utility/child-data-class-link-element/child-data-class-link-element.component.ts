import { Component, OnInit, Input } from '@angular/core';
import { DataClass, DataClassDetail, DataClassDetailResponse, CatalogueItem, ModelDomainType } from '@maurodatamapper/mdm-resources'; 

@Component({
  selector: 'mdm-child-data-class-link-element',
  templateUrl: './child-data-class-link-element.component.html',
  styleUrls: ['./child-data-class-link-element.component.scss']
})
export class ChildDataClassLinkElementComponent implements OnInit {
  @Input() item: DataClass;

  uiParams: any;
  uiRef: string;

  constructor() { }

  ngOnInit(): void {
    this.uiParams = { dataModelId: this.item.model, parentDataClassId: this.item.parentDataClass, id: this.item.id };
    this.uiRef = "app.container.childDataClass";
  }

}