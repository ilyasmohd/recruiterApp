import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms';
import { JobseekerService } from '../ApiService/jobseeker.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { CurrentOpeningsService } from '../ApiService/current-openings.service';
import { isDefined } from '@angular/compiler/src/util';
import { MiscellaneousService } from '../ApiService/miscellaneous.service';
import { Countries, Country } from '../../assets/country-list/country-list';
import { NotFoundError } from '../Common/not-found-eror';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http'
import { ResponseContentType, ResponseType, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent implements OnInit, AfterViewInit {

  public totalQualifications: Qualification[] = [{ Degree: "", YearPassed: "", University: "", ID: 0, JobSeekerID: 0 }];
  public totalExperience: Experience[] = [{ To: "", Company: "", From: "", Designation: "", ID: 0, JobSeekerID: 0 }];
  public totalProfessions: Profession[] = [{ Job: "", Division: "", Industry: "", Position: "", ID: 0, JobSeekerID: 0 }];
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
  public newQualification: Qualification = { YearPassed: "", Degree: "", University: "", ID: 0, JobSeekerID: 0 };
  public newExperience: Experience = { Designation: "", From: "", Company: "", To: "", ID: 0, JobSeekerID: 0 }
  public newProfession: Profession = { Job: "", Division: "", Industry: "", Position: "", ID: 0, JobSeekerID: 0 }
  public showLoader: boolean = false;
  public sourceIdentityMasterData: SourceIdentityMasterData[] = [];
  public miscelaneous: Miscelaneous = { SourceMasterData: [], IndustryMasterData: [], PositionMasterData: [], DivisionMasterData: [] };
  public jobMasterData: currentOpenings[] = [];
  public importedCountries: Country[] = [];
  public existingJobSeekerChecked: boolean = false;
  public applicationSubmittedText: string = '';
  public cvFileUrl: SafeResourceUrl = '';

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
    ID: -99,
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
    IsAddresSame: false
  };

  constructor(private jobseekerService: JobseekerService, private datePipe: DatePipe, private route: ActivatedRoute,
    private openingsService: CurrentOpeningsService, private miscellaneousService: MiscellaneousService, private sanitizer: DomSanitizer) {
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

  ngAfterViewInit() {
    // not using it as of now!!!!
  }

  addProfessions(e) {
    if (e) e.preventDefault();
    // if (this.jobSeekerObj.ID != -99) {
    //   //this.newProfession.  =this.jobSeekerObj.ID;
    // }
    console.log('this.newProfession', this.newProfession);
    this.jobSeekerObj.Profession.push(this.newProfession);
    this.newProfession = { Job: "", Division: "", Industry: "", Position: "", ID: 0, JobSeekerID: 0 };
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
      this.newQualification = { Degree: "", University: "", YearPassed: "", ID: 0, JobSeekerID: 0 };
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
      this.newExperience = { Company: "", Designation: "", From: "", To: "", ID: 0, JobSeekerID: 0 };
    }
  }

  removeExperience(expIndex) {
    this.jobSeekerObj.Experience.splice(expIndex, 1);
  }

  UpdateSourceIdentity() {
    console.log('this.jobSeekerObj.Source:', this.jobSeekerObj.Source);
    if (isDefined(this.miscelaneous.SourceMasterData.filter(_productType => _productType.Description == this.jobSeekerObj.Source)[0])) {
      this.sourceIdentityMasterData = this.miscelaneous.SourceMasterData.filter(_productType => _productType.Description == this.jobSeekerObj.Source)[0].SourceIdentities;
    }
    else {
      this.sourceIdentityMasterData = [];
      this.jobSeekerObj.SourceIdentity = "";
    }
  }

  toggleAddress() {
    //this.isAddresSame = !this.isAddresSame;
    this.jobSeekerObj.IsAddresSame = !this.jobSeekerObj.IsAddresSame;
    if (this.jobSeekerObj.IsAddresSame) {
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
    this.jobSeekerObj.Qualification.forEach((qual: Qualification, index: number) => {
      qual.YearPassed = this.datePipe.transform(qual.YearPassed, 'yyyy-MM-dd');
    });
    this.jobSeekerObj.Experience.forEach((experience, index) => {
      experience.From = this.datePipe.transform(experience.From, 'yyyy-MM-dd');
      experience.To = this.datePipe.transform(experience.To, 'yyyy-MM-dd');
    });
    console.log('job seeker object on submit click:', this.jobSeekerObj);
    if (this.jobSeekerObj.ID == -99) {
      this.jobseekerService.Create(this.jobSeekerObj).subscribe(res => {
        console.log(res);
        this.applicationNo = res;
        this.isApplicationSubmitted = true;
        this.applicationSubmittedText = `Your application has been submitted, your application No:${res}`;
        this.showLoader = false;
      }, err => {
        this.isApplicationError = true;
        this.isApplicationSubmitted = false;
        this.showLoader = false;
        console.log(err)
      });
    }
    else {
      this.jobseekerService.Update(this.jobSeekerObj).subscribe(res => {
        console.log('update method called, this is response', res);
        this.applicationNo = res;
        this.isApplicationSubmitted = true;
        this.showLoader = false;
      }, err => {
        console.log('error while updating the details', err);
        this.isApplicationError = true;
        this.isApplicationSubmitted = false;
        this.showLoader = false;
      });
    }

  }

  handleCVUpload(files: FileList): void {
    console.log('trying to upload cv file');
    this.cvFile = files.item(0);
    this.jobseekerService.UploadFile(this.cvFile).subscribe(res => { console.log(res); this.jobSeekerObj.CV = res; this.cvUploaded = true; }, err => console.log('cv upload failure', err));
  }

  checkExistingFile(fileName: string) {
    //if (e) e.preventDefault();
    console.log('checking existing cv');
    this.jobseekerService.GetUploadedFile(fileName).subscribe((res: any) => {
      let blo: any = new Blob([res as Blob]);
      console.log(blo);
      FileSaver.saveAs(blo, "panaropic200731539.jpg");
      //this.cvFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blo));
    });
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
    this.showLoader = true;
    this.jobseekerService.CheckExistingJobSeeker(this.jobSeekerObj.PassportNo, this.jobSeekerObj.AadharNo).subscribe(res => {
      this.jobSeekerObj = res;
      this.existingJobSeekerChecked = true;
      this.UpdateSourceIdentity();
      console.log('response from exisiting jobseeker api', this.jobSeekerObj);
      this.showLoader = false;
      this.applicationSubmittedText = `Your Details have been updated, Your application no is ${this.jobSeekerObj.ID}`;
    }, err => {
      if (err instanceof NotFoundError) {
        console.log('No existing job seeker found');
        this.existingJobSeekerChecked = true;
      }
      else {
        this.isApplicationError = true;
        this.existingJobSeekerChecked = false;
      }
      this.showLoader = false;
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
  IsAddresSame: boolean
}

interface Qualification {
  ID: number,
  University: string,
  Degree: string,
  YearPassed: string,
  JobSeekerID: number
}

interface Experience {
  ID: Number,
  Company: string,
  Designation: string,
  From: string,
  To: string,
  JobSeekerID: number
}

interface Profession {
  ID: number,
  Job: string,
  Industry: string,
  Position: string,
  Division: string,
  JobSeekerID: number
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
