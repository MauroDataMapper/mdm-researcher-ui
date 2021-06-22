import { Component, OnInit, Input } from '@angular/core';
import { catalogueItem } from '@shared/shared-classes';

@Component({
  selector: 'mdm-link-element',
  templateUrl: './link-element.component.html',
  styleUrls: ['./link-element.component.scss']
})
export class LinkElementComponent implements OnInit {
  @Input() item: catalogueItem;

  linkUri: string;

  constructor() { }

  ngOnInit(): void {
    switch (this.item.domainType) {
      case "DataModel": {
        this.linkUri = `${window.location.origin}/dataModel/${this.item.id}`;
        break;
      }
      case "DataClass": {
        this.linkUri = `${window.location.origin}/dataClass/${this.item.model}/${this.item.id}`;
        break;
      }
      case "DataElement": {
        let dataModel = this.item.breadcrumbs.filter(this.getDataModelBreadcrumb);
        let dataClass = this.item.breadcrumbs.filter(this.getDataClassBreadcrumb);

        this.linkUri = `${window.location.origin}/dataElement/${dataModel[0].id}/${dataClass[0].id}/${this.item.id}`;
        break;
      }
      default:{
        this.linkUri = `${window.location.origin}`
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
