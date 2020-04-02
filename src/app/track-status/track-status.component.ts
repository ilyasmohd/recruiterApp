import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StatusService } from '../ApiService/status.service';


@Component({
  selector: 'app-track-status',
  templateUrl: './track-status.component.html',
  styleUrls: ['./track-status.component.scss']
})
export class TrackStatusComponent implements OnInit {

  public statusMasterData: StatusMasterData[] = [];
  public statusUpdated: boolean = false;
  public completeStatus: TrackStatus = { ID: 0, Name: "", Passport: "", Aadhar: "", Task: "", Cell: "", Status: [] };
  public presentStatusID: number = 0;
  public nextStatusID: number = 0;
  public remarks: string = "";
  public nextStatusDate: Date;

  constructor(private datePipe: DatePipe, private statusService: StatusService) { }

  ngOnInit() {
    this.statusService.GetStatusMasterData().subscribe(statuses => {
      //console.log(statuses);
      this.statusMasterData = statuses;
      console.log(this.statusMasterData);
    }, err => {
      console.log(err);
    })
  }

  checkStatus(passportNo: string, aadhar: string) {
    console.log('checkStatus', passportNo, aadhar);
    this.statusService.TrackStatus(passportNo, aadhar).subscribe(status => {
      console.log(status);
      this.completeStatus = status[0];
    }, err => {
      console.log(err);
    })
  }

  updateTrackStatus() {
    console.log(this.presentStatusID, this.nextStatusID, this.remarks, this.nextStatusDate);
    this.statusService.UpdateTrackStatus(
      this.completeStatus.ID,
      this.presentStatusID,
      this.nextStatusID,
      this.remarks,
      this.nextStatusDate
    ).subscribe(res => {
      console.log(res);
      this.statusUpdated = true;
    }, err => {
      console.log(err);
    });
  }
}

interface TrackStatus {
  ID: number,
  Name: string,
  Passport: string,
  Aadhar: string,
  Task: string,
  Cell: string,
  Status: Status[]
}

interface Status {
  Date: Date,
  PresentStatus: string,
  NextStatus: string,
  NextStatusDate: Date,
  Remarks: string
}

interface StatusMasterData {
  ID: string,
  Description: string
}
