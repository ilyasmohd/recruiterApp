import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms';
import { JobseekerService } from '../ApiService/jobseeker.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent implements OnInit {

  public totalQualifications: Qualification[] = [{ Degree: "", YearPassed: "", University: "" }];
  public totalExperience: Experience[] = [{ To: "", Company: "", From: "", Designation: "" }];
  private cvFile: File = null;
  private passportFile: File = null;
  private certificatesFile: File = null;
  private picFile: File = null;
  public isApplicationSubmitted: boolean = false;
  public applicationNo: any = 0;
  public cvUploaded:boolean=false;
  public photoUploaded:boolean=false;
  public certificateUploaded:boolean=false;
  public ppcopyuploaded:boolean=false;
  public isApplicationError =false;

  public jobSeekerObj: JobSeekerDetails = {
    AadharNo: "", FirstName: "", Address: "", AlternateCellNo: "", CV: "", CellNo: "", Certificates: "", City: "",
    Currency: "", DOB: "", Email: "", Experience: [], FamilyName: "", Gender: "Male",
    ID: 0, Industry: "", PIN: "", PPCopy: "", PassportNo: "", PermanentAddress: "", PermanentCity: "", PermanentPIN: "",
    Photo: "", Profession: "", Qualification: [], SalaryExpected: 0, SalaryExpectedRemarks: "", SecondName: ""
  };


  constructor(private fb: FormBuilder, private jobSeekerSerive: JobseekerService, private datePipe: DatePipe) { }
  //public qualArray: Array<any> = [];
  public newQualification: Qualification = { YearPassed: "", Degree: "", University: "" };
  //public expArray: Array<any> = [];
  public newExperience: Experience = { Designation: "", From:"", Company: "", To:"" }

  ngOnInit() {

  }

  addQualifications(e) {
    if (e) e.preventDefault();
    console.log('this.newQualification', this.newQualification);
    this.newQualification.YearPassed = this.datePipe.transform(this.newQualification.YearPassed, 'yyyy-MM-dd');
    this.jobSeekerObj.Qualification.push(this.newQualification);
    this.newQualification = { Degree: "", University: "", YearPassed: "" };
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

  onSubmit(): void {
    this.jobSeekerObj.DOB = this.jobSeekerObj.DOB;
    console.log('job seeker object on submit click:', this.jobSeekerObj);
    this.jobSeekerSerive.Create(this.jobSeekerObj).subscribe(res => { console.log(res), this.applicationNo = res, this.isApplicationSubmitted = true; }, err =>{ this.isApplicationError=true;this.isApplicationSubmitted = false; console.log(err)});
  }

  handleCVUpload(files: FileList): void {
    console.log('trying to upload cv file');
    this.cvFile = files.item(0);
    this.jobSeekerSerive.UploadFile(this.cvFile).subscribe(res => { console.log(res); this.jobSeekerObj.CV = res; this.cvUploaded = true; }, err => console.log('cv upload failure', err));
  }

  handlePhotoUpload(files: FileList): void {
    this.picFile = files.item(0);
    this.jobSeekerSerive.UploadFile(this.picFile).subscribe(res => { console.log(res); this.jobSeekerObj.Photo = res; this.photoUploaded = true; }, err => console.log(err));
  }

  handleCertificateUpload(files: FileList): void {
    this.certificatesFile = files.item(0);
    this.jobSeekerSerive.UploadFile(this.certificatesFile).subscribe(res => { console.log(res); this.jobSeekerObj.Certificates = res; this.certificateUploaded = true; }, err => console.log(err));
  }

  handlePassportUpload(files: FileList): void {
    this.passportFile = files.item(0);
    this.jobSeekerSerive.UploadFile(this.passportFile).subscribe(res => { console.log(res); this.jobSeekerObj.PPCopy = res; this.ppcopyuploaded = true; }, err => console.log(err));
  }
}

interface JobSeekerDetails {
  ID: number
  FirstName: string;
  SecondName: string;
  FamilyName: string;
  Gender: string;
  DOB: string;
  Address: string;
  City: string;
  PIN: string;
  PermanentAddress: string;
  PermanentCity: string;
  PermanentPIN: string;
  PassportNo: string;
  AadharNo: string;
  CellNo: string;
  AlternateCellNo: string;
  Email: string;
  Profession: string;
  Industry: string;
  SalaryExpected: number;
  Currency: string;
  SalaryExpectedRemarks: string;
  CV: string;
  Photo: string;
  Certificates: string;
  PPCopy: string;
  Qualification: Qualification[];
  Experience: Experience[];
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

