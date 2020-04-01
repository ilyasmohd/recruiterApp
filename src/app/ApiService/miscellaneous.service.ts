import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class MiscellaneousService extends DataService {

  constructor(http: HttpClient) {
    super(environment.jobSeekerApiUrl, http);
  }

  GetJobSeekerMiscellaneous(): Observable<any> {
    //const opts = { params: new HttpParams().set('miscellaneous', 'miscellaneous') };
    //return this.http.get(environment.miscellaneousApiUrl + '/GetJobSeekerMiscellaneousDetails', opts)
    //  .catch(super.handleError);

    return this.http.get(environment.miscellaneousApiUrl + '/GetJobSeekerMiscellaneousDetails')
      .catch(super.handleError);
  }

  GetJobSeekerStatus():Observable<any>{
    return this.http.get(environment.miscellaneousApiUrl + '/GetJobSeekerStatus')
      .catch(super.handleError);
  }
}
