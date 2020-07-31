import { Component, OnInit } from '@angular/core';
import { FeedBackService } from '../ApiService/feed-back.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  public feedBackQuestions: FeedBackQuestions[];
  public feedBackDetails: FeedBackDetails = { CustomerName: "", City: "", OfficialName: "", FeedbackType: 0, date: "", FeedBackProvided: [], Comments: "", Email: "", Mobile: '' };
  public isFeedBackSubmitted: boolean;
  public isApplicationError: boolean;
  public showLoader: boolean = false;

  constructor(private feedBackService: FeedBackService) {
    this.isFeedBackSubmitted = false;
    this.isApplicationError = false;
  }

  ngOnInit() {
    //his.showLoader = true;
  }

  radioChanged() {
    //console.log(this.feedBackDetails.feedbackType);
    this.showLoader = true;
    this.feedBackDetails.FeedBackProvided.splice(0, this.feedBackDetails.FeedBackProvided.length);
    this.feedBackService.GetAllQuestions(this.feedBackDetails.FeedbackType).subscribe(
      questions => {
        questions.forEach(element => {
          element.PointsGiven = "";
          this.feedBackDetails.FeedBackProvided.push(element);
        });
        if (this.feedBackDetails) {
          console.log(this.feedBackDetails);
          //this.showLoader = false;
        }
      },
      error => {
        console.log(error); this.isApplicationError = true; this.isFeedBackSubmitted = false; this.showLoader = false;

      }, () => {
        this.showLoader = false;
      });

  }

  onSubmit(): void {
    this.showLoader = true;
    console.log('feed back entered:', this.feedBackDetails);
    this.feedBackService.Create(this.feedBackDetails).subscribe(
      res => {
        console.log(res); this.isFeedBackSubmitted = true;
      },
      err => {
        console.log(err); this.isApplicationError = true; this.isFeedBackSubmitted = false;
      }
    );
    this.showLoader = false;
  }

}

interface FeedBackQuestions {
  ID: number,
  Question: string,
  MaxPoints: number,
  PointsGiven: string,
  FeedBackRemarks: string
}

interface FeedBackDetails {
  CustomerName: string,
  OfficialName: string,
  FeedbackType: number,
  City: string,
  Mobile: string,
  Email: string,
  date: string,
  FeedBackProvided: FeedBackQuestions[],
  Comments: string
}



