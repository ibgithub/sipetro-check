import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { DataService} from '../data.service';

import * as moment from 'moment';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { Srf } from '../models/srf.model';

// [{"date":"20180604","serverName":"Koperbi Primary","fileName":"20180604.1.srf.gz","fileSize":"30 MB","lastModified":"04/06/2018 16:35:01"}]
// [{"date":"20190913","serverName":"Koperbi Primary","fileName":"NOT_EXIST","fileSize":"NOT_EXIST","lastModified":"NOT_EXIST"}]

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
  // srfs: Srf[] = []; 
  srfs: Srf[] = []; 
  displayedColumns: string[] = ['serverName', 'date', 'fileName', 'fileSize', 'lastModified'];
  selected: {start: moment.Moment, end: moment.Moment};
  servers = 'ALL';
  
  constructor(private data: DataService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      
    })
  }

  ngOnInit() {
    
  }

  onSubmit() {
    // console.log(this.selected);
    if (!this.selected.start) {
      this.selected.start = moment(); 
    }
    if (!this.selected.end) {
      this.selected.end = moment(); 
    }
    // console.log(this.selected);
    const start = this.selected.start.format('YYYYMMDD');
    const end = this.selected.end.format('YYYYMMDD');

    // alert(start + end + this.servers);

    if (this.servers === 'ALL') {
      this.data.getSrfs('10.212.115.5', start, end).subscribe((data: any) => {
        this.srfs = data;
        this.data.getSrfs('10.212.115.6', start, end).subscribe((data: any) => {
          this.srfs = this.srfs.concat(data);
          this.data.getSrfs('10.227.115.8', start, end).subscribe((data: any) => {
            this.srfs = this.srfs.concat(data);
            this.data.getSrfs('10.227.115.9', start, end).subscribe((data: any) => {
              this.srfs = this.srfs.concat(data);
            });
          });  
        });
      });
    } else {
      let datas: Srf[] = []; 
      this.data.getSrfs(this.servers, start, end).subscribe((data: any) => {
        this.srfs = data;
        datas = data;
      });
    }
    this.submitted = true;
  }
  
}

