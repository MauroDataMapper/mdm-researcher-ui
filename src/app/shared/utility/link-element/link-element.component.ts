import { Component, OnInit, Input } from '@angular/core';
import { catalogueItem } from '@shared/shared-classes';

@Component({
  selector: 'mdm-link-element',
  templateUrl: './link-element.component.html',
  styleUrls: ['./link-element.component.scss']
})
export class LinkElementComponent implements OnInit {
  @Input() item: catalogueItem;

  uiParams: any;
  uiRef: string;

  constructor() { }

  ngOnInit(): void {
    switch (this.item.domainType) {
      case "DataModel": {
        this.uiParams = { id: this.item.id };
        this.uiRef = "app.container.dataModel";
        break;
      }
      case "DataClass": {
        this.uiParams = { dataModelId: this.item.model, id: this.item.id };
        this.uiRef = "app.container.dataClass";
        break;
      }
      case "DataElement": {
        let dataModel = this.item.breadcrumbs.filter(this.getDataModelBreadcrumb);
        let dataClass = this.item.breadcrumbs.filter(this.getDataClassBreadcrumb);

        this.uiParams = { dataModelId: dataModel[0].id, dataClassId: dataClass[0].id, id: this.item.id };
        this.uiRef = "app.container.dataElement";
        break;
      }
    }
  }

  getDataModelBreadcrumb(element): boolean {
    return element.domainType === "DataModel";
  }
  getDataClassBreadcrumb(element): boolean {
    return element.domainType === "DataClass";
  }
}