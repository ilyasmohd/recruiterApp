import { Component, OnInit } from '@angular/core';
import { FeedBackService } from '../ApiService/feed-back.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  public feedBackQuestions: FeedBackQuestions[];
  public feedBackDetails: FeedBackDetails = { CustomerName: "", OfficialName: "", feedbackType: "employer", date: "", FeedBackProvided: [] };
  public isFeedBackSubmitted: boolean;
  public isApplicationError: boolean;
  public showLoader: boolean = true;

  constructor(private feedBackService: FeedBackService) {
    this.isFeedBackSubmitted = false;
    this.isApplicationError = false;
  }

  ngOnInit() {
    this.showLoader = true;
    this.feedBackService.GetAllQuestions().subscribe(
      questions => {
        questions.forEach(element => {
          this.feedBackDetails.FeedBackProvided.push(element);
        });
        if (this.feedBackDetails) {
          console.log(this.feedBackDetails);
          this.showLoader = false;
        }
      },
      error => {
        console.log(error); this.isApplicationError = true; this.isFeedBackSubmitted = false;
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
  ID: number;
  Question: string;
  MaxPoints: number;
  PointsGiven: number;
  FeedBackRemarks: string;
}

interface FeedBackDetails {
  CustomerName: string;
  OfficialName: string;
  feedbackType: string;
  date: string
  FeedBackProvided: FeedBackQuestions[];
}



