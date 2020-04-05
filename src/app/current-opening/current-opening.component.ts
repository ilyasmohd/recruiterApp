import { Component, OnInit } from '@angular/core';
import { CurrentOpeningsService } from '../ApiService/current-openings.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-current-opening',
  templateUrl: './current-opening.component.html',
  styleUrls: ['./current-opening.component.scss']
})
export class CurrentOpeningComponent implements OnInit {
  showLoader: boolean = false
  private _openings: currentOpenings[];

  public get openings(): currentOpenings[] {
    return this._openings;
  }
  public set openings(value: currentOpenings[]) {
    //console.log('this is the final data', this.openings);
    this._openings = value;
  }
  constructor(private openingsService: CurrentOpeningsService, private router: Router) {
  }

  ngOnInit() {
    this.showLoader = true;
    this.openingsService.GetAll().subscribe(
      jobs => {
        this.openings = jobs;
        if (this.openings) {
          this.showLoader = false;
        }
      }, err => {
        console.log(err);
      });
  }

  public get getAllOpenings(): currentOpenings[] {
    return this.openings;
  }

  navigate(profession: any) {
    console.log(profession);
    this.router.navigate(['/jobseeker', profession]);
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
