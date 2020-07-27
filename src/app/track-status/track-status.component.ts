import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StatusService } from '../ApiService/status.service';
import { ActivatedRoute } from "@angular/router";
import { $ } from 'protractor';

@Component({
  selector: 'app-track-status',
  templateUrl: './track-status.component.html',
  styleUrls: ['./track-status.component.scss']
})
export class TrackStatusComponent implements OnInit {

  public statusMasterData: StatusMasterData[] = [];
  public statusUpdated: boolean = false;
  public searchByPassport: string = "";
  public searchByAadhar: string = "";
  public searchByApplication: string = "";
  public completeStatus: TrackStatus = { ID: 0, Name: "", PassPort: "", Aadhar: "", TaskDetails: "", Cell: "", Status: [], ECNR: false };
  public presentStatusID: number = 0;
  public nextStatusID: number = 0;
  public remarks: string = "";
  public nextStatusDate: Date;
  public isAdmin: boolean = false;
  public noResultFound: string = "";
  constructor(private datePipe: DatePipe, private statusService: StatusService, private route: ActivatedRoute) {
    const url: any = route.snapshot.url.join('');
  }

  ngOnInit() {
    //console.log(this.route.snapshot.paramMap.get("admin"));
    //console.log(this.route.snapshot.url);
    this.isAdmin = (this.route.snapshot.paramMap.get("admin") == "admin") && (this.route.snapshot.url[0].path == "adminstatus");
    console.log('isAdmin:', this.isAdmin);
  }

  changeStatus() {
    document.getElementById('noresultFound').innerHTML = "No Applicant Found";
    setTimeout(function () {
      document.getElementById('noresultFound').innerHTML = "";
    }, 1500);
  }

  checkStatus() {
    console.log('checkStatus', this.completeStatus.PassPort, this.completeStatus.Aadhar, this.completeStatus.ID);
    if (this.searchByPassport != '' || this.searchByAadhar != '' || this.searchByApplication != '') {
      this.statusService.TrackStatus(this.searchByPassport == '' ? '-99' : this.searchByPassport, this.searchByAadhar == '' ? '-99' : this.searchByAadhar, this.searchByApplication == '' ? '-99' : this.searchByApplication).subscribe(status => {
        console.log(status);
        if (status.length > 0) {
          this.completeStatus = status[0];
          console.log(this.completeStatus);
          //receiving the status master data from backend
          this.statusService.GetStatusMasterData().subscribe(statuses => {
            this.statusMasterData = statuses;

            this.statusMasterData.filter(status => {
              //let found: boolean = true;
              return this.completeStatus.Status.some(stat => {
                return status.ID == stat.PresentStatus || status.ID == stat.NextStatus;
              });
              //return found;
            });

            if (this.completeStatus.ECNR) {
              this.statusMasterData = this.statusMasterData.filter(status => {
                return status.ID != 10;
              });
            }
            console.log(this.statusMasterData);
          }, err => {
            console.log(err);
          });

        }
        else {
          this.completeStatus.ID = 0;
          this.completeStatus.Name = "";
          this.completeStatus.TaskDetails = "";
          this.completeStatus.Cell = "";
          this.completeStatus.Status = [];
          this.completeStatus.PassPort = "";
          this.completeStatus.Aadhar = "";
          this.changeStatus();
        }
      }, err => {
        console.log(err);
      });
    }
  }

  // checkStatusbyAadhar() {
  //   console.log('checkStatus', this.completeStatus.PassPort, this.completeStatus.Aadhar, this.completeStatus.ID);
  //   if (this.searchByAadhar != "") {
  //     this.statusService.TrackStatus("", this.searchByAadhar, 0).subscribe(status => {
  //       console.log(status);
  //       if (status.length > 0) {
  //         this.completeStatus = status[0];
  //       }
  //       else {
  //         this.completeStatus.ID = 0;
  //         this.completeStatus.Name = "";
  //         this.completeStatus.TaskDetails = "";
  //         this.completeStatus.Cell = "";
  //         this.completeStatus.Status = [];
  //         this.completeStatus.PassPort = "";
  //         this.completeStatus.Aadhar = "";
  //         this.changeStatus();
  //       }
  //     }, err => {
  //       console.log(err);
  //     });
  //   }
  // }

  // checkStatusbyApplicationNo() {
  //   console.log('checkStatus', this.completeStatus.PassPort, this.completeStatus.Aadhar, this.completeStatus.ID);
  //   if (this.searchByApplication != "") {
  //     this.statusService.TrackStatus("", "", this.searchByApplication).subscribe(status => {
  //       console.log(status);
  //       if (status.length > 0) {
  //         this.completeStatus = status[0];
  //       }
  //       else {
  //         this.completeStatus.ID = 0;
  //         this.completeStatus.Name = "";
  //         this.completeStatus.TaskDetails = "";
  //         this.completeStatus.Cell = "";
  //         this.completeStatus.Status = [];
  //         this.completeStatus.PassPort = "";
  //         this.completeStatus.Aadhar = "";
  //         this.changeStatus();
  //       }
  //     }, err => {
  //       console.log(err);
  //     });
  //   }
  // }

  // checkStatusbyPassPort() {
  //   console.log('checkStatus', this.completeStatus.PassPort, this.completeStatus.Aadhar, this.completeStatus.ID);
  //   if (this.searchByPassport != "") {
  //     this.statusService.TrackStatus(this.searchByPassport, "", 0).subscribe(status => {
  //       console.log(status);
  //       if (status.length > 0) {
  //         this.completeStatus = status[0];
  //       }
  //       else {
  //         this.completeStatus.ID = 0;
  //         this.completeStatus.Name = "";
  //         this.completeStatus.TaskDetails = "";
  //         this.completeStatus.Cell = "";
  //         this.completeStatus.Status = [];
  //         this.completeStatus.PassPort = "";
  //         this.completeStatus.Aadhar = "";
  //         this.changeStatus();
  //       }
  //     }, err => {
  //       console.log(err);
  //     });
  //   }
  // }

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
  PassPort: string,
  Aadhar: string,
  TaskDetails: string,
  Cell: string,
  Status: Status[],
  ECNR: boolean
}

interface Status {
  Date: Date,
  PresentStatus: number,
  NextStatus: number,
  NextStatusDate: Date,
  Remarks: string
}

interface StatusMasterData {
  ID: number,
  Description: string
}
