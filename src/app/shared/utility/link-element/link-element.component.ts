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
      case "ReferenceDataModel": {
        this.uiParams = { id: this.item.id };
        this.uiRef = "app.container.referenceDataModel";
        break;
      }      
      case "DataClass": {
        /**
         * If there are breadcrumbs that look like
         * breadcrumb[0] is a DataModel
         * breadcrumb[n] is a DataClass
         * then this is a child of the DataClass in breadcrumb[n]
         * Else it's a DataClass that belongs directly to the DataModel
         */
        if (this.isBreadcrumbOf(this.item.breadcrumbs, 0, 'DataModel')) {
          if (this.isBreadcrumbOf(this.item.breadcrumbs, this.item.breadcrumbs.length - 1, 'DataClass')) {
            this.uiParams = { dataModelId: this.item.model, parentDataClassId: this.item.breadcrumbs[this.item.breadcrumbs.length - 1].id, id: this.item.id };
            this.uiRef = "app.container.childDataClass";
          } else {
            this.uiParams = { dataModelId: this.item.model, id: this.item.id };
            this.uiRef = "app.container.dataClass";
          }
        }
        break;
      }
      case "DataElement": {
        /**
         * If there are breadcrumbs that look like
         * breadcrumb[0] is a DataModel
         * breadcrumb[1] is a DataClass
         * breadcrumb[2] is a DataClass
         * then this is a DataElement of the DataClass in breadcrumb[2]
         * Else it's in the DataClass of breadcrumb[1]
         */
         if (this.isBreadcrumbOf(this.item.breadcrumbs, 0, 'DataModel')) {
          if (this.isBreadcrumbOf(this.item.breadcrumbs, 1, 'DataClass')) {
            if (this.isBreadcrumbOf(this.item.breadcrumbs, 2, 'DataClass')) {
              this.uiParams = { dataModelId: this.item.model, dataClassId: this.item.breadcrumbs[2].id, id: this.item.id };
              this.uiRef = "app.container.dataElement";
            } else {
              this.uiParams = { dataModelId: this.item.model, dataClassId: this.item.breadcrumbs[1].id, id: this.item.id };
              this.uiRef = "app.container.dataElement";
            }
          }
        }
        break;
      }
    }
  }

  isBreadcrumbOf(breadcrumbs, position, of): boolean {
    return breadcrumbs[position] !== undefined 
    && breadcrumbs[position].domainType == of;
  }
}