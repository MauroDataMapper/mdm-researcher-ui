/**
 * Copyright 2020-2021 University of Oxford
 * and Health and Social Care Information Centre, also known as NHS Digital,
 * and University of Edinburgh.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MdmResourcesService } from "@mdm/services/mdm-resources/mdm-resources.service";
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SecurityService } from '@mdm/services/security/security.service';

@Component({
  selector: 'mdm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string = "";
  totalItemCount: number = 0;
  searchResults: any[];
  isAuthenticated: boolean;

  @ViewChild('searchInputControl', { static: true }) searchInputControl: ElementRef;
  @ViewChild(NgbPagination, { static: true }) paginator: NgbPagination;
  
  isLoadingResults: boolean = true;

  pageEvent: PageEvent;

  constructor(
    public resources: MdmResourcesService,
    private securityService: SecurityService
  ) 
  { }

  ngOnInit(): void {
    
    this.securityService
    .isAuthenticated()
    .subscribe(result => {
      if (result) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });

    fromEvent(this.searchInputControl.nativeElement, 'keyup')
    .pipe(map((event: any) => {
      return event.target.value;
    }),
      filter((res: any) => res.length >= 0),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.search(10, 1);
      });

    this.paginator
    .pageChange
    .subscribe((text: string) => {
      this.search(this.paginator.pageSize, this.paginator.page);
    });
  }    
  
  fetch(pageSize: number, offset: number): Observable<any> {
    this.isLoadingResults = true;

    return this.resources.catalogueItem.search(
      {
        classifierFilter: null,
        classifiers: [],
        createdAfter: null,
        createdBefore: null,
        dataModelTypes: null,
        domainTypes: ["DataModel"],
        labelOnly: false,
        lastUpdatedAfter: null,
        lastUpdatedBefore: null,
        limit: pageSize,
        offset: (offset - 1) * pageSize,
        searchTerm: this.searchTerm
      });
  }  

  search(pageSize: number, offset: number) {

    this.securityService
    .isAuthenticated()
    .subscribe(result => {
      if (result) {
        this.isAuthenticated = true;
        this.fetch(pageSize, offset)
        .subscribe(async (resp) => {
          this.searchResults = resp.body.items;
          this.isLoadingResults = false;
          this.totalItemCount = resp.body.count > 0 ? resp.body.count : 0;
        });
      } else {
        this.isAuthenticated = false;
      }
    });

  }
}