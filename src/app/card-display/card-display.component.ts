import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdm-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss']
})
export class CardDisplayComponent implements OnInit {
  @Input() item: catalogueItem;

  constructor() { }

  ngOnInit(): void {
  }

}

export class catalogueItem {
  id: string;
  domainType: string;
  label: string;
  model: string;
  breadcrumbs: any[];
  description: string;
}