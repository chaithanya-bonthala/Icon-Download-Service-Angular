import { Component, OnInit } from '@angular/core';
import { IPanelConfig } from '../panel/panel.constants';

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.scss']
})
export class PanelsComponent implements OnInit {
  public title = 'Panels';

  constructor() { }

  ngOnInit() {
  }
}
