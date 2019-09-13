import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { DataService} from '../data.service';

import * as _moment from 'moment';
// import {default as _rollupMoment} from 'moment';
// const moment = _rollupMoment || _moment;
const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

// [{"date":"20180604","serverName":"Koperbi Primary","fileName":"20180604.1.srf.gz","fileSize":"30 MB","lastModified":"04/06/2018 16:35:01"}]
// [{"date":"20190913","serverName":"Koperbi Primary","fileName":"NOT_EXIST","fileSize":"NOT_EXIST","lastModified":"NOT_EXIST"}]
export interface Srf {
  date: string;
  serverName: string;
  fileName: string;
  fileSize: string;
  lastModified: string;
}

const ELEMENT_DATA: Srf[] = [
  {date: '20180604', serverName: 'Koperbi Primary', fileName: '20180604.1.srf.gz', fileSize: '30 MB', lastModified: '04/06/2018 16:35:01'},
  {date: '20190913', serverName: 'Koperbi Primary', fileName: 'NOT_EXIST', fileSize: 'NOT_EXIST', lastModified: 'NOT_EXIST'},
];

@Component({
  selector: 'app-srf',
  templateUrl: './srf.component.html',
  styleUrls: ['./srf.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SrfComponent implements OnInit {

  date = new FormControl(moment());
  messageForm: FormGroup;
  submitted = false;
  srfs: Object;
  displayedColumns: string[] = ['serverName', 'fileName', 'fileSize', 'lastModified'];

  constructor(private data: DataService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      
    })
  }

  ngOnInit() {
    
  }

  onSubmit() {
    console.log("date=" + this.date);
    const ctrlValue = this.date.value;
    console.log(ctrlValue.year() + ctrlValue.month() + ctrlValue.date() );  
    
    this.srfs = ELEMENT_DATA;
    // this.data.getSrf().subscribe(data => {
    //   this.srfs = data
    //   console.log(this.srfs)
    // })
    this.submitted = true;
  }

}
