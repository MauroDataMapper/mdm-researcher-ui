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

import { Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarLinkGroup } from './layout/navbar/navbar.model';
import { TestingModule } from './modules/testing/testing.module';

@Component({selector: 'mdm-navbar', template: ''})
class NavbarStubComponent { 
  @Input() linkGroups: NavbarLinkGroup[] = [];
}

@Component({selector: 'mdm-footer', template: ''})
class FooterStubComponent { }

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestingModule
      ],
      declarations: [
        AppComponent,
        NavbarStubComponent,
        FooterStubComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'mdm-researcher-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('mdm-researcher-ui');
  });
});
