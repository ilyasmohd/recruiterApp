import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmployerService extends DataService {

  constructor(http: HttpClient) {
    super(environment.employerRequirementApiUrl, http);
  }
}
