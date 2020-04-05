import { Component, OnInit } from '@angular/core';
import { JobseekerService } from '../ApiService/jobseeker.service';
import { DatePipe } from '@angular/common';
import { MiscellaneousService } from '../ApiService/miscellaneous.service';

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
