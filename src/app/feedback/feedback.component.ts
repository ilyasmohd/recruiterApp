import { Component, OnInit } from '@angular/core';
import { FeedBackService } from '../ApiService/feed-back.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  public feedBackQuestions: FeedBackQuestions[];
  public feedBackDetails: FeedBackDetails = { CustomerName: "", OfficialName: "", FeedBackProvided: [] };
  public isFeedBackSubmitted: boolean;
  public isApplicationError: boolean;

  constructor(private feedBackService: FeedBackService) {
    this.isFeedBackSubmitted = false;
    this.isApplicationError = false;
  }

  ngOnInit() {
    this.feedBackService.GetAllQuestions().subscribe(
      questions => {
        questions.forEach(element => {
          this.feedBackDetails.FeedBackProvided.push(element);
        });
        console.log(this.feedBackDetails);
      },
      error => {
        console.log(error); this.isApplicationError = true
      });
  }

  onSubmit(): void {
    console.log('feed back entered:', this.feedBackDetails);
    this.feedBackService.Create(this.feedBackDetails).subscribe(
      res => {
        console.log(res); this.isFeedBackSubmitted = true
      },
      err => {
        console.log(err); this.isApplicationError = true; this.isFeedBackSubmitted = false
      }
    );
  }

}

interface FeedBackQuestions {
  ID: number;
  Question: string;
  MaxPoints: number;
  PointsGiven: number;
  Remarks: string;
}

interface FeedBackDetails {
  CustomerName: string;
  OfficialName: string;
  FeedBackProvided: FeedBackQuestions[];
}



