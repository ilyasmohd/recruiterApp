import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class StatusService extends DataService {

  constructor(http: HttpClient) {
    super(environment.statusApiUrl, http);
  }

  TrackStatus(passPortNo: string, adharNo: string): Observable<any> {
    const opts = { params: new HttpParams().set('type', 'TrackStatus').set("passPortNo", passPortNo).set("aadharNo", adharNo) };
    return this.http.get(environment.statusApiUrl, opts)
      .catch(super.handleError);
  }

  GetStatusMasterData(): Observable<any> {
    const opts = { params: new HttpParams().set('type', 'StatusMasterData') };
    return this.http.get(environment.statusApiUrl, opts)
      .catch(super.handleError);
  }

  UpdateTrackStatus(jobSeekerID: number, presentID: number, nextID: number, remarks: string, nextStatusDate: Date): Observable<any> {
    return this.http.post(environment.statusApiUrl, { jobSeekerID, presentID, nextID, remarks, nextStatusDate })
      .catch(super.handleError);
  }
}
