import { Component, OnInit } from '@angular/core';
import { JobseekerService } from '../ApiService/jobseeker.service';
import { DatePipe } from '@angular/common';
import { MiscellaneousService } from '../ApiService/miscellaneous.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-total-applicants',
  templateUrl: './total-applicants.component.html',
  styleUrls: ['./total-applicants.component.scss']
})
export class TotalApplicantsComponent implements OnInit {

  public searchByName: string = "";
  public searchByPassPortNo: string = "";
  public searchByAadharNo: string = "";
  public searchByDivision: string = "";
  public searchByIndustry: string = "";
  public searchByPosition: string = "";

  public totalJobSeekers: JobSeekerDetails[] = [];
  public miscelaneous: Miscelaneous = { SourceMasterData: [], IndustryMasterData: [], PositionMasterData: [], DivisionMasterData: [] };
  public jobSeekers: JobSeekerDetails[] = [];
  constructor(private jobseekerService: JobseekerService, private datePipe: DatePipe, private miscellaneousService: MiscellaneousService) { }

  ngOnInit() {
    this.jobseekerService.GetAll().subscribe(jobSeekers => {
      this.totalJobSeekers = jobSeekers;
      this.jobSeekers = jobSeekers;
      console.log(this.totalJobSeekers);
    }, err => {
      console.log(err);
    });

    this.miscellaneousService.GetJobSeekerMiscellaneous().subscribe(res => {
      console.log("response from miscelaneous", res);
      this.miscelaneous = res;
    }, err => {
      console.log("err from miscelaneous", err);
    });
  }

  searchApplicants(e: any) {
    if (e) e.preventDefault();
    let searchedJobSeeker: JobSeekerDetails[] = [];
    if (this.searchByName != '') {
      this.totalJobSeekers.filter(t => t.FirstName.search(this.searchByName) > -1).forEach(x => {
        searchedJobSeeker.push(x);
      });
    }
    if (this.searchByPassPortNo != '') {
      this.totalJobSeekers.filter(t => t.PassportNo.search(this.searchByPassPortNo) > -1).forEach(x => {
        if (searchedJobSeeker.findIndex(s => s.FirstName.search(x.FirstName) == -1)) {
          searchedJobSeeker.push(x);
        }
      });
    }
    if (this.searchByAadharNo != '') {
      this.totalJobSeekers.filter(t => t.AadharNo.search(this.searchByAadharNo) > -1).forEach(x => {
        if (searchedJobSeeker.findIndex(s => s.FirstName.search(x.FirstName) == -1)) {
          searchedJobSeeker.push(x);
        }
      });;
    }
    if (this.searchByIndustry != '') {
      this.totalJobSeekers.forEach(jobSeeker => {
        jobSeeker.Profession.forEach(profes => {
          if (profes.Industry.trim().toLowerCase() == this.searchByIndustry.trim().toLowerCase()) {
            //searchedJobSeeker.push(jobSeeker);
            if (searchedJobSeeker.findIndex(x => x.FirstName.search(jobSeeker.FirstName) == -1)) {
              searchedJobSeeker.push(jobSeeker);
            }
          }
        });
      });
    }
    this.jobSeekers = searchedJobSeeker;
  }
  searchApplicantsByName(e: any) {
    if (e) e.preventDefault();
    this.jobSeekers = this.totalJobSeekers.filter(x => x.FirstName.search(this.searchByName) > -1);
  }

  searchApplicantsByPassPortNo(e: any) {
    if (e) e.preventDefault();
    this.jobSeekers = this.totalJobSeekers.filter(x => x.PassportNo.search(this.searchByPassPortNo) > -1);
  }

  searchApplicantsByAadharNo(e: any) {
    if (e) e.preventDefault();
    this.jobSeekers = this.totalJobSeekers.filter(x => x.AadharNo.search(this.searchByAadharNo) > -1);
  }

  searchApplicantsByDivision(e: any) {
    if (e) e.preventDefault();
    let newSekeer: any[] = [];
    this.totalJobSeekers.forEach(jobSeeker => {
      jobSeeker.Profession.forEach(profes => {
        if (profes.Division.trim().toLowerCase() == this.searchByDivision.trim().toLowerCase()) {
          newSekeer.push(jobSeeker);
        }
      });
    });
    this.jobSeekers = newSekeer;
  }
  searchApplicantsByIndustry(e: any) {
    if (e) e.preventDefault();
    let newSekeer: any[] = [];
    this.totalJobSeekers.forEach(jobSeeker => {
      jobSeeker.Profession.forEach(profes => {
        if (profes.Industry.trim().toLowerCase() == this.searchByIndustry.trim().toLowerCase()) {
          newSekeer.push(jobSeeker);
        }
      });
    });
    this.jobSeekers = newSekeer;
  }
  searchApplicantsByPosition(e: any) {
    if (e) e.preventDefault();
    let newSekeer: any[] = [];
    this.totalJobSeekers.forEach(jobSeeker => {
      jobSeeker.Profession.forEach(profes => {
        if (profes.Position.trim().toLowerCase() == this.searchByPosition.trim().toLowerCase()) {
          newSekeer.push(jobSeeker);
        }
      });
    });
    this.jobSeekers = newSekeer;
  }

  downLoadApplicantCV(fileName: string) {
    console.log('checking existing cv');
    this.jobseekerService.GetUploadedFile(fileName).subscribe((blobResponse: Blob) => {
      let fileBlob: Blob = new Blob([blobResponse]);
      FileSaver.saveAs(fileBlob, fileName);
    }, err => {
      console.log('error', err);
      //$('.test').text = 'test';
    });
  }

  viewApplicantCV(fileName: string){
    this.jobseekerService.GetUploadedFile(fileName).subscribe((blobResponse: Blob) => {
      let fileBlob: Blob = new Blob([blobResponse]);
      const fileURL = URL.createObjectURL(fileBlob);
      window.open(fileURL, '_blank');
      //FileSaver.saveAs(fileBlob, fileName);
    }, err => {
      console.log('error', err);
      //$('.test').text = 'test';
    });
  }

}

interface JobSeekerDetails {
  ID: number,
  FirstName: string,
  SecondName: string,
  FamilyName: string,
  Gender: string,
  DOB: string,
  Address: string,
  City: string,
  PIN: string,
  Country: string,
  PermanentAddress: string,
  PermanentCity: string,
  PermanentPIN: string;
  PermanentCountry: string,
  PassportNo: string,
  AadharNo: string,
  CellNo: string,
  AlternateCellNo: string,
  Email: string,
  Industry: string,
  SalaryExpected: number,
  Currency: string,
  SalaryExpectedRemarks: string,
  CV: string,
  Photo: string,
  Certificates: string,
  PPCopy: string,
  Profession: Profession[],
  Qualification: Qualification[],
  Experience: Experience[],
  Source: string,
  SourceIdentity: string,
  Job: string,
  Division: string,
  Position: string
}

interface Qualification {
  University: string;
  Degree: string;
  YearPassed: string
}

interface Experience {
  Company: string;
  Designation: string;
  From: string;
  To: string;
}

interface Profession {
  Industry: string,
  Position: string,
  Division: string
}

interface Miscelaneous {
  PositionMasterData: PositionMasterData[],
  DivisionMasterData: DivisionMasterData[],
  IndustryMasterData: IndustryMasterData[],
  SourceMasterData: SourceMasterData[]
}

interface PositionMasterData {
  ID: number,
  Description: string
}

interface DivisionMasterData {
  ID: number,
  Description: string
}

interface IndustryMasterData {
  ID: number,
  Description: string
}

interface SourceMasterData {
  ID: number,
  Description: string,
  SourceIdentities: SourceIdentityMasterData[]
}

interface SourceIdentityMasterData {
  ID: number,
  Description: string
}
