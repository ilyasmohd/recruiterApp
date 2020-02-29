import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  private qualArray: Array<any> = [];
  private newQualification: any = {};
  private expArray: Array<any> = [];
  private newExperience: any = {};
  ngOnInit() {

  }
  addQualifications() {
    this.qualArray.push(this.newQualification)
    this.newQualification = {};
  }

  removeQualifications(qualIndex) {
    this.qualArray.splice(qualIndex, 1);
  }

  addExperience() {
    this.expArray.push(this.newExperience)
    this.newExperience = {};
  }

  removeExperience(expIndex) {
    this.expArray.splice(expIndex, 1);
  }
}


