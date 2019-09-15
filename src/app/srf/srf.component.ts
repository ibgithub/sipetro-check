import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { DataService} from '../data.service';

import * as _moment from 'moment';

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
})
export class SrfComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  srfs: Object;
  displayedColumns: string[] = ['serverName', 'fileName', 'fileSize', 'lastModified'];
  selected: {start: _moment.Moment, end: _moment.Moment};

  constructor(private data: DataService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      
    })
  }

  ngOnInit() {
    
  }

  onSubmit() {
    console.log(this.selected);
    if (this.selected.start) {
      this.srfs = ELEMENT_DATA;
      // this.data.getSrf().subscribe(data => {
      //   this.srfs = data
      //   console.log(this.srfs)
      // })
      this.submitted = true;
    } else {
      alert('Please choose date!')
    }
    
  }
}
