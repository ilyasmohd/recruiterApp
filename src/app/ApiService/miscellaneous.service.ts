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
    super(environment.miscellaneousApiUrl, http);
  }

  GetJobSeekerMiscellaneous(): Observable<any> {
    const opts = { params: new HttpParams().set('type', 'Miscellaneous') };
    return this.http.get(environment.miscellaneousApiUrl, opts)
      .catch(super.handleError);
  }
}
