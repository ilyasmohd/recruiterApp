import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AppError } from '../Common/app-error';
import { NotFoundError } from '../Common/not-found-eror';
import { BadRequest } from '../Common/bad-request-error';

@Injectable({
  providedIn: 'root'
})
export class FeedBackService extends DataService {

  constructor(http: HttpClient) {
    super(environment.feedBackApiUrl, http);
  }

  GetAllQuestions(questionTypeID: number): Observable<any> {
    const opts = { params: new HttpParams().set('customerName', 'GetFeedBackQuestions').set('questionTypeId', questionTypeID.toString()) };
    return this.http.get(environment.feedBackApiUrl, opts)
      .catch(super.handleError);
  }
}

