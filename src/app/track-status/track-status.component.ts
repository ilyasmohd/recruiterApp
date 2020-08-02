import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StatusService } from '../ApiService/status.service';
import { ActivatedRoute } from "@angular/router";

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
  public presentStatusDescription: string = '';
  public nextStatusID: number = 0;
  public remarks: string = "";
  public nextStatusDate: Date;
  public isAdmin: boolean = false;
  public noResultFound: string = "";
  public RemoveEcnrStatus: number[] = [9];
  public currentDate: string = '';

  constructor(private datePipe: DatePipe, private statusService: StatusService, private route: ActivatedRoute) {
    //const url: any = route.snapshot.url.join('');
  }

  ngOnInit() {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.isAdmin = (this.route.snapshot.paramMap.get("admin") == "admin") && (this.route.snapshot.url[0].path == "adminstatus");
    // console.log('isAdmin:', this.isAdmin);
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
        if (status.length > 0) {
          this.completeStatus = status[0];
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
      }, () => {
        this.getStatusMasterData();
      });
    }
  }

  getStatusMasterData() {
    this.statusService.GetStatusMasterData().subscribe(statuses => {
      this.statusMasterData = statuses;
    }, err => {
      console.log(err);
    }, () => {
      this.removeUnWantedStatues();
    });
  }

  removeUnWantedStatues() {

    let statusDescriptionArray: string[] = [];
    let idTobeRemoved: number = 0;
    if (this.completeStatus.Status.length > 0) {
      idTobeRemoved = this.statusMasterData.find(x => x.Description == this.completeStatus.Status[0].NextStatus).ID;
    }

    // statusDescriptionArray.indexOf(masterData.Description) == -1
    this.statusMasterData = this.statusMasterData.filter(masterData => {
      let remove = false;
      if (masterData.ID <= idTobeRemoved) {
        remove = true;
      }
      else if ((this.RemoveEcnrStatus.indexOf(masterData.ID) != -1) && this.completeStatus.ECNR) {
        remove = true;
      }
      else {
        remove = false;
      }
      return !remove;
    });

    console.log('this.completeStatus.Status.length', this.completeStatus.Status.length);
    if (this.completeStatus.Status.length > 0) {
      this.presentStatusDescription = this.completeStatus.Status[0].NextStatus;
    }
    else {
      this.presentStatusDescription = 'Start the process!';
    }

  }

  updateTrackStatus() {
    console.log(this.presentStatusID, this.nextStatusID, this.remarks, 'nextStatusDate:', this.datePipe.transform(this.nextStatusDate, 'dd-MMM-yyyy'));
    this.statusService.UpdateTrackStatus(
      this.completeStatus.ID,
      1,  //this.presentStatusID,
      this.nextStatusID,
      this.remarks,
      this.datePipe.transform(new Date(), 'dd-MMM-yyyy')
    ).subscribe(res => {
      console.log(res);
      this.statusUpdated = true;
      this.remarks = "";
      this.checkStatus();
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
  Date: string,
  NextStatus: string,
  NextStatusDate: string,
  Remarks: string
}

interface StatusMasterData {
  ID: number,
  Description: string
}
