import { Component, OnInit } from '@angular/core';
import { CurrentOpeningsService } from '../ApiService/current-openings.service';

@Component({
  selector: 'app-current-opening',
  templateUrl: './current-opening.component.html',
  styleUrls: ['./current-opening.component.scss']
})
export class CurrentOpeningComponent implements OnInit {

  private _openings: currentOpenings[];

  public get openings(): currentOpenings[] {
    return this._openings;
  }
  public set openings(value: currentOpenings[]) {
    //console.log('this is the final data', this.openings);
    this._openings = value;
  }
  constructor(private openingsService: CurrentOpeningsService) {
  }

  ngOnInit() {
    this.openingsService.GetAll().subscribe(jobs => this.openings = jobs);
  }

  public get getAllOpenings(): currentOpenings[] {
    return this.openings;
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
