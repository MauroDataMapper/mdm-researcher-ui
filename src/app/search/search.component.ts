import { Component, OnInit } from '@angular/core';
import { MdmResourcesService } from "@mdm/services/mdm-resources/mdm-resources.service";

@Component({
  selector: 'mdm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string = "";
  searchResults: any[];
  neverSearched: boolean;

    constructor(public resources: MdmResourcesService) { }

  ngOnInit(): void {
    this.neverSearched = true;
  }

  onSearchClick(): void {
    if (this.searchTerm !== "") {
      this.doSearch().subscribe(res => {
        this.neverSearched = false;
        this.searchResults = res.body.items;
      });
    }
  }

  doSearch(): any {
    return this.resources.catalogueItem.search(
            {
              classifierFilter: null,
              classifiers: [],
              createdAfter: null,
              createdBefore: null,
              dataModelTypes: null,
              domainTypes: [],
              labelOnly: false,
              lastUpdatedAfter: null,
              lastUpdatedBefore: null,
              limit: 10,
              offset: 0,
              pageIndex: 0,
              pageSize: 10,
              searchTerm: this.searchTerm
            });
  }
}