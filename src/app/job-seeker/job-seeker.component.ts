import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms';
import { JobseekerService } from '../ApiService/jobseeker.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { CurrentOpeningsService } from '../ApiService/current-openings.service';
import { isDefined } from '@angular/compiler/src/util';
import { MiscellaneousService } from '../ApiService/miscellaneous.service';
import { Countries, Country } from '../../assets/country-list/country-list';
import { NotFoundError } from '../Common/not-found-eror';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent implements OnInit {

  public totalQualifications: Qualification[] = [{ Degree: "", YearPassed: "", University: "" }];
  public totalExperience: Experience[] = [{ To: "", Company: "", From: "", Designation: "" }];
  public totalProfessions: Profession[] = [{ Job: "", Division: "", Industry: "", Position: "" }];
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
  public newProfession: Profession = { Job: "", Division: "", Industry: "", Position: "" }
  public showLoader: boolean = false;
  public isAddresSame: boolean = false;
  public sourceIdentityMasterData: SourceIdentityMasterData[] = [];
  public miscelaneous: Miscelaneous = { SourceMasterData: [], IndustryMasterData: [], PositionMasterData: [], DivisionMasterData: [] };
  public jobMasterData: currentOpenings[] = [];
  public importedCountries: Country[] = [];
  public existingJobSeekerChecked: boolean = false;

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
    PIN: "",
    PPCopy: "",
    PassportNo: "",
    PermanentAddress: "",
    PermanentCity: "",
    PermanentPIN: "",
    PermanentCountry: "",
    Photo: "",
    Profession: [],
    Qualification: [],
    SalaryExpected: 0,
    SalaryExpectedRemarks: "",
    SecondName: "",
    SourceIdentity: "",
    Source: "",
  };

  constructor(private jobseekerService: JobseekerService, private datePipe: DatePipe, private route: ActivatedRoute,
    private openingsService: CurrentOpeningsService, private miscellaneousService: MiscellaneousService) {
    this.importedCountries = Countries;
  }

  ngOnInit() {
    this.routeJob = this.route.snapshot.paramMap.get("profession");
    if (this.routeJob) {
      this.newProfession.Job = this.routeJob;
      //this.jobSeekerObj.Professions.push(this.newProfession);
      console.log('routeJob', this.routeJob);
    }

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
    console.log('this.newProfession', this.newProfession);
    this.jobSeekerObj.Profession.push(this.newProfession);
    this.newProfession = { Job: "", Division: "", Industry: "", Position: "" };
  }

  removeProfessions(profIndex) {
    this.jobSeekerObj.Profession.splice(profIndex, 1);
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
    if (this.newExperience.From != "" && this.newExperience.To != "" && this.newExperience.Designation != "" && this.newExperience.Company != "") {
      this.newExperience.From = this.datePipe.transform(this.newExperience.From, 'yyyy-MM-dd');
      this.newExperience.To = this.datePipe.transform(this.newExperience.To, 'yyyy-MM-dd');
      this.jobSeekerObj.Experience.push(this.newExperience)
      this.newExperience = { Company: "", Designation: "", From: "", To: "" };
    }
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
    this.jobSeekerObj.DOB = this.datePipe.transform(this.jobSeekerObj.DOB, 'yyyy-MM-dd');
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

  checkExistingJobSeeker() {
    this.jobseekerService.CheckExistingJobSeeker(this.jobSeekerObj.PassportNo, this.jobSeekerObj.AadharNo).subscribe(res => {
      console.log('response from exisiting jobseeker api', res);
      this.jobSeekerObj = res;
      this.existingJobSeekerChecked = true;
    }, err => {
      if (err instanceof NotFoundError) {
        console.log('No existing job seeker found');
        this.existingJobSeekerChecked = true;
      }
      else {
        this.isApplicationError = true;
        this.existingJobSeekerChecked = false;
      }
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
  Job: string,
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
