import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class catalogueItem {
  id: string;
  domainType: string;
  label: string;
  model: string;
  breadcrumbs: any[];
  description: string;
}
