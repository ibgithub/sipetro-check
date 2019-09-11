import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DaterangepickerComponent, DaterangepickerDirective } from 'ngx-daterangepicker-material';

@Component({
  selector: 'app-srf',
  templateUrl: './srf.component.html',
  styleUrls: ['./srf.component.scss']
})
export class SrfComponent implements OnInit {

  selected: {startDate: moment.Moment, endDate: moment.Moment};

  constructor() { }

  ngOnInit() {
  }

}
