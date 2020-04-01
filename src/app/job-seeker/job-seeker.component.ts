import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms';
import { JobseekerService } from '../ApiService/jobseeker.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { CurrentOpeningsService } from '../ApiService/current-openings.service';
import { isDefined } from '@angular/compiler/src/util';
import { MiscellaneousService} from '../ApiService/miscellaneous.service';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent implements OnInit {

  public totalQualifications: Qualification[] = [{ Degree: "", YearPassed: "", University: "" }];
  public totalExperience: Experience[] = [{ To: "", Company: "", From: "", Designation: "" }];
  public totalProfessions: Profession[] = [{ Division: "", Industry: "", Position: "" }];
  private cvFile: File = null;
  private passportFile: File = null;
  private certificatesFile: File = null;
  private picFile: File = null;
  public isApplicationSubmitted: boolean = false;
  public applicationNo: number = 0;
  public cvUploaded: boolean = false;
  public photoUploaded: boolean = false;
  public certificateUploaded: boolean = false;
  public ppcopyuploaded: boolean = false;
  public isApplicationError: boolean = false;
  public routeJob: string = '';
  public newQualification: Qualification = { YearPassed: "", Degree: "", University: "" };
  public newExperience: Experience = { Designation: "", From: "", Company: "", To: "" }
  public newProfession: Profession = { Division: "", Industry: "", Position: "" }
  public showLoader: boolean = false;
  public isAddresSame: boolean = false;
  //public sourceMasterData: string[] = [];
  public sourceIdentityMasterData: SourceIdentityMasterData[] = [];
  //public jobMasterData: string[] = [];
  //public industryMasterData: string[] = [];
  // public divisionMasterData: string[] = [];
  //public positionMasterData: string[] = [];
  public miscelaneous: Miscelaneous = { SourceMasterData: [], IndustryMasterData: [], PositionMasterData: [], DivisionMasterData: [] };
  public jobMasterData: currentOpenings[] = [];

  public jobSeekerObj: JobSeekerDetails = {
    AadharNo: "",
    FirstName: "",
    Address: "",
    AlternateCellNo: "",
    CV: "",
    CellNo: "",
    Certificates: "",
    City: "",
    Currency: "",
    Country: "",
    DOB: "",
    Email: "",
    Experience: [],
    FamilyName: "",
    Gender: "Male",
    ID: 0,
    Industry: "",
    Job: "",
    PIN: "",
    PPCopy: "",
    PassportNo: "",
    PermanentAddress: "",
    PermanentCity: "",
    PermanentPIN: "",
    PermanentCountry: "",
    Photo: "",
    Professions: [],
    Qualification: [],
    SalaryExpected: 0,
    SalaryExpectedRemarks: "",
    SecondName: "",
    SourceIdentity: "",
    Source: "",
    Division: "",
    Position: ""
  };

  constructor(private fb: FormBuilder, private jobseekerService: JobseekerService, private datePipe: DatePipe, private route: ActivatedRoute, 
    private openingsService: CurrentOpeningsService, private miscellaneousService:MiscellaneousService) {

    }

  ngOnInit() {
    this.routeJob = this.route.snapshot.paramMap.get("profession");
    this.jobSeekerObj.Job = this.routeJob;
    console.log(this.jobSeekerObj.Job);

    this.miscellaneousService.GetJobSeekerMiscellaneous().subscribe(res => {
      console.log("response from miscelaneous", res);
      this.miscelaneous = res;
    }, err => {
      console.log("err from miscelaneous", err);
    });

    this.openingsService.GetAll().subscribe(res => {
      console.log('res from current openings', res);
      this.jobMasterData = res;
      console.log(this.jobMasterData);
    }, err => {
      console.log("err from current openings controller", err);
    });
  }

  addProfessions(e) {
    if (e) e.preventDefault();
    // console.log('this.newProfession', this.newProfession);
    // this.jobSeekerObj.Professions.push(this.newProfession);
    // this.newProfession = { Division: "", Industry: "", Position: "" };
  }

  removeProfessions(profIndex) {
    this.jobSeekerObj.Professions.splice(profIndex, 1);
  }

  addQualifications(e) {
    if (e) e.preventDefault();
    console.log('this.newQualification', this.newQualification);
    if (this.newQualification.Degree != "" && this.newQualification.University != "" && this.newQualification.YearPassed != "") {
      this.newQualification.YearPassed = this.datePipe.transform(this.newQualification.YearPassed, 'yyyy-MM-dd');
      this.jobSeekerObj.Qualification.push(this.newQualification);
      this.newQualification = { Degree: "", University: "", YearPassed: "" };
    }
  }

  removeQualifications(qualIndex) {
    this.jobSeekerObj.Qualification.splice(qualIndex, 1);
  }

  addExperience(e) {
    if (e) e.preventDefault();
    this.newExperience.From = this.datePipe.transform(this.newExperience.From, 'yyyy-MM-dd');
    this.newExperience.To = this.datePipe.transform(this.newExperience.To, 'yyyy-MM-dd');
    this.jobSeekerObj.Experience.push(this.newExperience)
    this.newExperience = { Company: "", Designation: "", From: "", To: "" };
  }

  removeExperience(expIndex) {
    this.jobSeekerObj.Experience.splice(expIndex, 1);
  }

  UpdateSourceIdentity($event: SourceMasterData) {

    if (isDefined(this.miscelaneous.SourceMasterData.filter(_productType => _productType.Description == this.jobSeekerObj.Source)[0])) {
      this.sourceIdentityMasterData = this.miscelaneous.SourceMasterData.filter(_productType => _productType.Description == this.jobSeekerObj.Source)[0].SourceIdentities;
    }
    else {
      this.sourceIdentityMasterData = [];
      this.jobSeekerObj.SourceIdentity = "";
    }
  }

  toggleAddress() {
    this.isAddresSame = !this.isAddresSame;
    if (this.isAddresSame) {
      this.jobSeekerObj.PermanentCity = this.jobSeekerObj.City;
      this.jobSeekerObj.PermanentAddress = this.jobSeekerObj.Address;
      this.jobSeekerObj.PermanentPIN = this.jobSeekerObj.PIN;
      this.jobSeekerObj.PermanentCountry = this.jobSeekerObj.Country;
    }
    else {
      this.jobSeekerObj.PermanentCity = "";
      this.jobSeekerObj.PermanentAddress = "";
      this.jobSeekerObj.PermanentPIN = "";
      this.jobSeekerObj.PermanentCountry = "";
    }
    return;
  }

  onSubmit(): void {
    this.showLoader = true;
    this.jobSeekerObj.DOB = this.jobSeekerObj.DOB;
    console.log('job seeker object on submit click:', this.jobSeekerObj);
    this.jobseekerService.Create(this.jobSeekerObj).subscribe(res => {
      console.log(res);
      this.applicationNo = res;
      this.isApplicationSubmitted = true;
      this.showLoader = false;
    }, err => {
      this.isApplicationError = true; this.isApplicationSubmitted = false;
      this.showLoader = false;
      console.log(err)
    });

  }

  handleCVUpload(files: FileList): void {
    console.log('trying to upload cv file');
    this.cvFile = files.item(0);
    this.jobseekerService.UploadFile(this.cvFile).subscribe(res => { console.log(res); this.jobSeekerObj.CV = res; this.cvUploaded = true; }, err => console.log('cv upload failure', err));
  }

  handlePhotoUpload(files: FileList): void {
    this.picFile = files.item(0);
    this.jobseekerService.UploadFile(this.picFile).subscribe(res => { console.log(res); this.jobSeekerObj.Photo = res; this.photoUploaded = true; }, err => console.log(err));
  }

  handleCertificateUpload(files: FileList): void {
    this.certificatesFile = files.item(0);
    this.jobseekerService.UploadFile(this.certificatesFile).subscribe(res => { console.log(res); this.jobSeekerObj.Certificates = res; this.certificateUploaded = true; }, err => console.log(err));
  }

  handlePassportUpload(files: FileList): void {
    this.passportFile = files.item(0);
    this.jobseekerService.UploadFile(this.passportFile).subscribe(res => { console.log(res); this.jobSeekerObj.PPCopy = res; this.ppcopyuploaded = true; }, err => console.log(err));
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
  Professions: Profession[],
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

interface currentOpenings {
  ID: number;
  Profession: string;
  Employer: string;
  EmploymentCity: string;
  Renumeration: string;
  JobDescription: string;
  IsOppurtunityOpen: boolean;
  CreatedOn: Date;
}
