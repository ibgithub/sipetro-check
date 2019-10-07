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
import { SrfDto } from '../models/srf.dto';
import { SrfMapper } from '../models/srf.mapper';

const ELEMENT_DATA: Srf[] = [
  {date: '20180604', serverName: 'Koperbi Primary', fileName: '20180604.1.srf.gz', fileSize: '30 MB', lastModifiedDate: '04/06/2018', lastModifiedTime: '16:35:01'},
  {date: '20190913', serverName: 'Koperbi Primary', fileName: 'NOT_EXIST', fileSize: 'NOT_EXIST', lastModifiedDate: 'NOT_EXIST', lastModifiedTime: 'NOT_EXIST'},
  {date: '20190925', serverName: 'Koperbi Secondary', fileName: '20190925.1.srf.gz', fileSize: '88 MB', lastModifiedDate: '25/09/2019', lastModifiedTime: '16:35:01'},
  {date: '20190926', serverName: 'Koperbi Secondary', fileName: '20190926.1.srf.gz', fileSize: '96 MB', lastModifiedDate: '26/09/2019', lastModifiedTime: '16:35:01'},
  {date: '20190927', serverName: 'DC Colo Primary', fileName: '20190927.1.srf.gz', fileSize: '76 MB', lastModifiedDate: '27/09/2019', lastModifiedTime: '16:35:01'},
  {date: '20190928', serverName: 'DC Colo Primary', fileName: 'HOLIDAY', fileSize: 'HOLIDAY', lastModifiedDate: 'HOLIDAY', lastModifiedTime: 'HOLIDAY'},
  {date: '20190929', serverName: 'DC Colo Secondary', fileName: 'HOLIDAY', fileSize: 'HOLIDAY', lastModifiedDate: 'HOLIDAY', lastModifiedTime: 'HOLIDAY'},
  {date: '20190930', serverName: 'DC Colo Secondary', fileName: '20190930.1.srf.gz', fileSize: '84 MB', lastModifiedDate: '30/09/2019', lastModifiedTime: '16:35:01'},
  {date: '20191001', serverName: 'Koperbi Primary', fileName: '20191001.1.srf.gz', fileSize: '88 MB', lastModifiedDate: '01/10/2019', lastModifiedTime: '16:35:01'},
  {date: '20191002', serverName: 'Koperbi Primary', fileName: '20191002.1.srf.gz', fileSize: '100 MB', lastModifiedDate: '02/10/2019', lastModifiedTime: '16:35:01'},
  {date: '20191003', serverName: 'Koperbi Secondary', fileName: '20191003.1.srf.gz', fileSize: '97 MB', lastModifiedDate: '03/10/2019', lastModifiedTime: '16:35:01'},
  {date: '20191004', serverName: 'Koperbi Secondary', fileName: '20191004.1.srf.gz', fileSize: '88 MB', lastModifiedDate: '04/10/2019', lastModifiedTime: '16:35:01'},
  {date: '20191005', serverName: 'DC Colo Primary', fileName: 'HOLIDAY', fileSize: 'HOLIDAY', lastModifiedDate: 'HOLIDAY', lastModifiedTime: 'HOLIDAY'},
  {date: '20191006', serverName: 'DC Colo Primary', fileName: 'HOLIDAY', fileSize: 'HOLIDAY', lastModifiedDate: 'HOLIDAY', lastModifiedTime: 'HOLIDAY'},
  {date: '20191007', serverName: 'DC Colo Secondary', fileName: '20191007.1.srf.gz', fileSize: '257 MB', lastModifiedDate: '07/10/2019', lastModifiedTime: '14:41:14'},
  {date: '20190926', serverName: 'DC Colo Secondary', fileName: '20190926.1.srf.gz', fileSize: '96 MB', lastModifiedDate: '26/09/2019', lastModifiedTime: '16:35:01'},
  {date: '20180604', serverName: 'Koperbi Primary', fileName: '20180604.1.srf.gz', fileSize: '30 MB', lastModifiedDate: '04/06/2018', lastModifiedTime: '16:35:01'},
  {date: '20190913', serverName: 'Koperbi Primary', fileName: 'NOT_EXIST', fileSize: 'NOT_EXIST', lastModifiedDate: 'NOT_EXIST', lastModifiedTime: 'NOT_EXIST'},
  {date: '20190925', serverName: 'Koperbi Secondary', fileName: '20190925.1.srf.gz', fileSize: '88 MB', lastModifiedDate: '25/09/2019', lastModifiedTime: '16:35:01'},
  {date: '20190926', serverName: 'Koperbi Secondary', fileName: '20190926.1.srf.gz', fileSize: '96 MB', lastModifiedDate: '26/09/2019', lastModifiedTime: '16:35:01'},
  {date: '20190927', serverName: 'DC Colo Primary', fileName: '20190927.1.srf.gz', fileSize: '76 MB', lastModifiedDate: '27/09/2019', lastModifiedTime: '16:35:01'},
  {date: '20190928', serverName: 'DC Colo Primary', fileName: 'HOLIDAY', fileSize: 'HOLIDAY', lastModifiedDate: 'HOLIDAY', lastModifiedTime: 'HOLIDAY'},
  {date: '20190929', serverName: 'DC Colo Secondary', fileName: 'HOLIDAY', fileSize: 'HOLIDAY', lastModifiedDate: 'HOLIDAY', lastModifiedTime: 'HOLIDAY'},
  {date: '20190930', serverName: 'DC Colo Secondary', fileName: '20190930.1.srf.gz', fileSize: '84 MB', lastModifiedDate: '30/09/2019', lastModifiedTime: '16:35:01'},
  {date: '20191001', serverName: 'Koperbi Primary', fileName: '20191001.1.srf.gz', fileSize: '88 MB', lastModifiedDate: '01/10/2019', lastModifiedTime: '16:35:01'},
  {date: '20191002', serverName: 'Koperbi Primary', fileName: '20191002.1.srf.gz', fileSize: '100 MB', lastModifiedDate: '02/10/2019', lastModifiedTime: '16:35:01'},
  {date: '20191003', serverName: 'Koperbi Secondary', fileName: '20191003.1.srf.gz', fileSize: '97 MB', lastModifiedDate: '03/10/2019', lastModifiedTime: '16:35:01'},
  {date: '20191004', serverName: 'Koperbi Secondary', fileName: '20191004.1.srf.gz', fileSize: '88 MB', lastModifiedDate: '04/10/2019', lastModifiedTime: '16:35:01'},
  {date: '20191005', serverName: 'DC Colo Primary', fileName: 'HOLIDAY', fileSize: 'HOLIDAY', lastModifiedDate: 'HOLIDAY', lastModifiedTime: 'HOLIDAY'},
  {date: '20191006', serverName: 'DC Colo Primary', fileName: 'HOLIDAY', fileSize: 'HOLIDAY', lastModifiedDate: 'HOLIDAY', lastModifiedTime: 'HOLIDAY'},
  {date: '20191007', serverName: 'DC Colo Secondary', fileName: '20191007.1.srf.gz', fileSize: '257 MB', lastModifiedDate: '07/10/2019', lastModifiedTime: '14:41:14'},
  {date: '20190926', serverName: 'DC Colo Secondary', fileName: '20190926.1.srf.gz', fileSize: '96 MB', lastModifiedDate: '26/09/2019', lastModifiedTime: '16:35:01'}
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
  srfDtos: SrfDto[] = []; 
  dataSource = new MatTableDataSource<Srf>(this.srfs);
  displayedColumns: string[] = ['serverName', 'date', 'fileName', 'fileSize', 'lastModifiedDate', 'lastModifiedTime'];
  selected: {start: moment.Moment, end: moment.Moment};
  servers = 'ALL';
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      
    })
  }
  
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  onSubmit() {
    // // console.log(this.selected);
    // if (!this.selected.start) {
    //   this.selected.start = moment(); 
    // }
    // if (!this.selected.end) {
    //   this.selected.end = moment(); 
    // }
    // // console.log(this.selected);
    // const start = this.selected.start.format('YYYYMMDD');
    // const end = this.selected.end.format('YYYYMMDD');

    // if (this.servers === 'ALL') {    
    //   try {
    //     this.dataService.getSrfs('10.212.115.5', start, end).subscribe((data: any) => {
    //       if (data) {
    //         this.srfDtos = data;
    //       }
    //       this.dataService.getSrfs('10.212.115.6', start, end).subscribe((data: any) => {
    //         this.srfConcat(data);
    //         this.dataService.getSrfs('10.227.115.8', start, end).subscribe((data: any) => {
    //           this.srfConcat(data);
    //           this.dataService.getSrfs('10.227.115.9', start, end).subscribe((data: any) => {
    //             this.srfConcat(data);
    //             this.intoSrfs();
    //           });
    //         });  
    //       });
    //       (error: HttpErrorResponse) => {
    //         console.log(error);
    //       }
    //     });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // } else {
    //   this.dataService.getSrfs(this.servers, start, end).subscribe((data: any) => {
    //     this.srfDtos = data;
    //     this.intoSrfs();
    //   });
    // }
    this.srfs = ELEMENT_DATA;
    this.dataSource = new MatTableDataSource<Srf>(this.srfs);
    this.dataSource.sort = this.sort;
    this.submitted = true;
  }
  
  private intoSrfs() {
    if (this.srfDtos) {
      this.srfs = SrfMapper.toModels(this.srfDtos);
      this.dataSource = new MatTableDataSource<Srf>(this.srfs);
      this.dataSource.sort = this.sort;
      
      this.submitted = true;
    }
  }

  private srfConcat(data: any) {
    if (data) {
      if (this.srfDtos) {
        this.srfDtos = this.srfDtos.concat(data);
      }
      else {
        this.srfDtos = data;
      }
    }
  }
}

