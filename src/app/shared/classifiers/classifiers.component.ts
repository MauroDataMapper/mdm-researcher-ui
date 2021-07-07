import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdm-classifiers',
  templateUrl: './classifiers.component.html',
  styleUrls: ['./classifiers.component.scss']
})
export class ClassifiersComponent implements OnInit {
  @Input() classifiers: any[] = [];

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
