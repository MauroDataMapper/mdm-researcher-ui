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
  }
}