import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ResponseContentType, ResponseType } from '@angular/http';

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

  /*
  GetUploadedFile(fileName: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    //headers = headers.append('Accept', 'application/force-download');
    headers = headers.append('Accept', 'application/octet-stream');
    const opts = {
      headers: headers,
      params: new HttpParams().set('fileName', fileName)
    };

    return this.http.get(environment.fileUploadApiUrl, opts).map(
      res => {
        var bloba = new Blob([res as BlobPart]);
        return bloba;
      });
  }
  */

 GetUploadedFile(fileName: string): any {
    return this.http.get(environment.fileUploadApiUrl, { params: new HttpParams().set('fileName', fileName), responseType: 'text' });
  }
}
