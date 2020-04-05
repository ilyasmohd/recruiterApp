import { Component, OnInit } from '@angular/core';
import { CurrentOpeningsService } from '../ApiService/current-openings.service';
import { Router } from "@angular/router";
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Component({
  selector: 'app-manage-openings',
  templateUrl: './manage-openings.component.html',
  styleUrls: ['./manage-openings.component.scss']
})
export class ManageOpeningsComponent implements OnInit {

  public showLoader: boolean = false
  public currentOpenings: currentOpenings[] = [];
  public newOpenings: currentOpenings[] = [];
  public singleNewOpening: currentOpenings = { ID: 0, Profession: '', Employer: '', EmploymentCity: '', Renumeration: '', JobDescription: '', IsOppurtunityOpen: false, CreatedOn: new Date() }

  constructor(private openingsService: CurrentOpeningsService, private router: Router) {

  }

  ngOnInit() {
    this.showLoader = true;
    this.openingsService.GetAll().subscribe(
      jobs => {
        this.currentOpenings = jobs;
        if (this.currentOpenings) {
          this.showLoader = false;
        }
      }, err => {
        console.log(err);
      });
  }

  addOpening(e: any) {
    if (e) e.preventDefault();
    console.log('this.newQualification', this.singleNewOpening);
    if (this.singleNewOpening.Employer != "" && this.singleNewOpening.EmploymentCity != "" && this.singleNewOpening.JobDescription != "" && this.singleNewOpening.Profession != "" && this.singleNewOpening.Renumeration != "") {
      this.newOpenings.push(this.singleNewOpening);
      this.singleNewOpening = { ID: 0, Profession: '', Employer: '', EmploymentCity: '', Renumeration: '', JobDescription: '', IsOppurtunityOpen: false, CreatedOn: new Date() };
    }
  }

  createOpening(e: any) {
    if (e) e.preventDefault();
    console.log('newOpenings', this.newOpenings);
    this.showLoader = true;
    this.openingsService.Create(this.newOpenings).subscribe(res => {
      console.log(res);
      this.newOpenings = [];
      this.openingsService.GetAll().subscribe(openings => {
        this.currentOpenings = openings;
        this.showLoader = false;
      }, err => {
        //this.currentOpenings = [];
        //this.newOpenings = [];
        this.showLoader = false;
        console.log(err);
      })
    },
      err => {
        console.log(err);
        this.showLoader = false;
      })
  }

  updateOpening(opening: CurrentOpeningsService, q: number) {
    this.showLoader = true;
    this.openingsService.Update(opening).subscribe(res => {
      console.log(res);
      this.showLoader = false;
    },
      err => {
        console.log(err);
        this.showLoader = false;
      });
  }

  removeOpening(id: number, q: number) {
    this.showLoader = true;
    this.openingsService.Delete(id).subscribe(res => {
      this.currentOpenings.splice(q, 1);
      console.log(res);
      this.showLoader = false;
    },
      err => {
        console.log(err);
        this.showLoader = false;
      }
    )
  }

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