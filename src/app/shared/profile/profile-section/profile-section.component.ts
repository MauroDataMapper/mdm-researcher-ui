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
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdm-item-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss']
})
export class ProfileSectionComponent implements OnInit {
  @Input() section: any;

  constructor(
  ) { }

  ngOnInit(): void {

  }

    /**
   * 
   * @param field If section contains a field called _hidden, and if that field's value contains 
   * field.fieldName in a semi colon separated string, return false. Or, if field.fieldName === '_hidden'
   * then return false.
   * Else return true.
   * @param field A field whose visibility we want to determine
   * @param section The section containing the field, and possibly also another field called _hidden
   * @returns boolean
   */
     displayField(field, section): boolean {
      if (field.fieldName === '_hidden') {
        return false;
      }
  
      var _hidden = "";
      section.fields.forEach((sectionField) => {      
        if (sectionField.fieldName === '_hidden') {
          _hidden = sectionField.currentValue;
        }
      });
  
      var _hiddenArray = _hidden.split(";").map(function(item) {
        return item.trim();
      });
  
      if (_hiddenArray.includes(field.fieldName)) {
        return false;
      }
  
      return true;
    }
}
