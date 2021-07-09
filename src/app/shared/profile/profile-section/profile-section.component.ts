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
}
