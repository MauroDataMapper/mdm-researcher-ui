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
