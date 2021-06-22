import { Component, OnInit, Input } from '@angular/core';
import { catalogueItem } from '@shared/shared-classes';

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