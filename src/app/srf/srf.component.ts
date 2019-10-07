import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { DataService} from '../data.service';

import * as moment from 'moment';
import { DataSource } from '@angular/cdk/table';
import { Observable, forkJoin } from 'rxjs';
import { Srf } from '../models/srf.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort, MatTableDataSource } from '@angular/material';

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
  srfs: Srf[] = []; 
  dataSource = new MatTableDataSource<Srf>(this.srfs);
  displayedColumns: string[] = ['serverName', 'date', 'fileName', 'fileSize', 'lastModifiedDate', 'lastModifiedTime'];
  selected: {start: moment.Moment, end: moment.Moment};
  servers = 'ALL';
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private data: DataService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      
    })
  }
  
  ngOnInit() {
    this.dataSource.sort = this.sort;
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

    if (this.servers === 'ALL') {    
      try {
        this.data.getSrfs('10.212.115.5', start, end).subscribe((data: any) => {
          if (data) {
            this.srfs = data;  
          }
          this.data.getSrfs('10.212.115.6', start, end).subscribe((data: any) => {
            this.srfConcat(data);
            this.data.getSrfs('10.227.115.8', start, end).subscribe((data: any) => {
              this.srfConcat(data);
              this.data.getSrfs('10.227.115.9', start, end).subscribe((data: any) => {
                this.srfConcat(data);
              });
            });  
          });
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      this.data.getSrfs(this.servers, start, end).subscribe((data: any) => {
        this.srfs = data;
      });
    }
    
    if (this.srfs) {
      this.dataSource = new MatTableDataSource<Srf>(this.srfs);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
      });
    }
    this.submitted = true;
  }
  
  private srfConcat(data: any) {
    if (data) {
      if (this.srfs) {
        this.srfs = this.srfs.concat(data);
      }
      else {
        this.srfs = data;
      }
    }
  }
}

