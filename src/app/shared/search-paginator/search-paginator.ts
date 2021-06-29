/*
Copyright 2020-2021 University of Oxford
and Health and Social Care Information Centre, also known as NHS Digital

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

SPDX-License-Identifier: Apache-2.0
*/
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'search-paginator',
  template: '<mat-paginator [pageSizeOptions]="pageSizeOptions" [pageSize]="pageSize" [length]="length" showFirstLastButtons (page)="changed($event)"></mat-paginator>'
})
export class SearchPaginatorComponent extends MatPaginator implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
    const settings = JSON.parse(localStorage.getItem('userSettings'));
    if (settings) {
      this.pageSize = settings.countPerTable;
      this.pageSizeOptions =  settings.counts;
    }
  }

  changed(value) {
    this.pageSize = value.pageSize;
    this.pageIndex = value.pageIndex;
    this.page.emit(value);
  }
}