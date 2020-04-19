import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

  UploadFile(fileTobeUploaded: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', fileTobeUploaded, fileTobeUploaded.name);
    return this.http.post(environment.fileUploadApiUrl, formData);
  }

  GetUploadedFile(fileName: string): Observable<Blob> {
    return this.http.get(environment.fileUploadApiUrl, { params: new HttpParams().set('fileName', fileName), responseType: 'blob' });
  }
}
