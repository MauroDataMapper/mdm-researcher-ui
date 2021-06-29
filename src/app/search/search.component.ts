import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MdmResourcesService } from "@mdm/services/mdm-resources/mdm-resources.service";
import { Observable, Subject, fromEvent } from 'rxjs';
import { debounceTime, map, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'mdm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string = "";
  searchCount: number;
  searchResults: any[];
  neverSearched: boolean;

  @ViewChild('searchInputControl', { static: true })
  searchInputControl: ElementRef;
  
  pageIndex: any;
  isLoading: boolean;

  pageEvent: PageEvent;

  //TODO use when adding filtering
  formData: any = {
    showSearchResult: false
    //labelOnly: false,
    //exactMatch: false,
    //selectedDomainTypes: {
    //  DataModel: false,
    //  DataClass: false,
    //  DataElement: false,
    //  DataType: false,
    //  EnumerationValue: false
    //},
    //classifiers: [],

    //lastDateUpdatedFrom: null,
    //lastDateUpdatedTo: null,

    //createdFrom: null,
    //createdTo: null
  };

  constructor(public resources: MdmResourcesService) { }

  ngOnInit(): void {
    this.neverSearched = true;

    fromEvent(this.searchInputControl.nativeElement, 'keyup').pipe(map((event: any) => {
      return event.target.value;
    }),
      filter((res: any) => res.length >= 0),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      if (text.length === 0) {
        this.formData.showSearchResult = false;
        this.searchResults = [];
        this.isLoading = false;
      } else {
        this.formData.showSearchResult = true;
        this.fetch(10, 0).subscribe(res => {
          this.searchResults = res.body.items;
          this.isLoading = false;
          this.neverSearched = false;
  
          this.searchCount = res.body.count > 0 ? res.body.count : -1;
        }, () => {
          this.isLoading = false;
        }
        );
      }
    });
  }    

  getServerData($event) {
    this.fetch($event.pageSize, $event.pageIndex).subscribe(res => {
      this.searchResults = res.body.items;
      this.searchCount = res.body.count;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  fetch(pageSize: number, offset: number): Observable<any> {
    this.isLoading = true;

    if (!this.formData.showSearchResult) {
      return new Observable();
    }

    //TODO use these when adding filtering
    /*const filterDataTypes = [];
    if (this.formData.selectedDomainTypes.DataModel) {
      filterDataTypes.push('DataModel');
    }
    if (this.formData.selectedDomainTypes.DataClass) {
      filterDataTypes.push('DataClass');
    }
    if (this.formData.selectedDomainTypes.DataElement) {
      filterDataTypes.push('DataElement');
    }
    if (this.formData.selectedDomainTypes.DataType) {
      filterDataTypes.push('DataType');
    }
    if (this.formData.selectedDomainTypes.EnumerationValue) {
      filterDataTypes.push('EnumerationValue');
    }*/

    //let searchText = this.searchInput;
    /*if (this.formData.exactMatch) {
      if (searchText[0] !== '"') {
        searchText = '"' + searchText;
      }
      if (searchText[searchText.length - 1] !== '"') {
        searchText = searchText + '"';
      }
    }*/

    /*const classifiersNames = [];
    this.formData.classifiers.forEach(classifier => {
      classifiersNames.push(classifier.label);
    });*/

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
        limit: pageSize,
        offset: offset * pageSize,
        searchTerm: this.searchTerm
      });
  }  
}