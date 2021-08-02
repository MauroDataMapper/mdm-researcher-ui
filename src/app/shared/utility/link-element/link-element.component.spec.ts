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
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkElementComponent } from './link-element.component';

describe('LinkElementComponent', () => {
  let component: LinkElementComponent;
  let fixture: ComponentFixture<LinkElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
