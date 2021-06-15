import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mdm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string = "";

  constructor() { }

  ngOnInit(): void {
  }
}
