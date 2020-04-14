import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

export class JobseekerService extends DataService {

  constructor(http: HttpClient) {
    super(environment.jobSeekerApiUrl, http);
  }

  CheckExistingJobSeeker(passportNo: string, aadharNo: string): Observable<any> {
    console.log('caling the exising job seeker user?', 'passportno:', passportNo, 'aadhar no:', aadharNo);
    const opts = { params: new HttpParams().set('id', '0').set('passPortNo', passportNo).set('aadharNo', aadharNo) };
    return this.http.get(environment.jobSeekerApiUrl, opts)
      .catch(super.handleError);
  }
}
