import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppError } from '../Common/app-error';
import { NotFoundError } from '../Common/not-found-eror';
import { BadRequest } from '../Common/bad-request-error';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


export class DataService {
  private headers:Headers = new Headers();
  constructor(private url: string, private http: HttpClient) {

   }

   GetAll():Observable<any> {
    return this.http.get(this.url)
    .catch(this.handleError);
  }

  Create(resource):Observable<any>{
    console.log('data to jobseeker service', resource);
    return this.http.post(this.url, resource,  {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
    }).catch(this.handleError);
  }

  Delete(id):Observable<any> {
    return this.http.delete(this.url + '/' + id)
    .catch(this.handleError);
  }

  Update(post):Observable<any> {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
    .catch(this.handleError);
  }

  private handleError(error: Response): Observable<Error> {
    console.log('here the error', error);
    if (error.status === 404) {
      return Observable.throw(new NotFoundError(error))
    }

    if (error.status === 400) {
      return Observable.throw(new BadRequest(error))
    }

    return Observable.throw(new AppError(error));
  }

  
  UploadFile(fileTobeUploaded:File):Observable<any>{
    let formData:FormData=new FormData();
    formData.append('file', fileTobeUploaded, fileTobeUploaded.name);
   return this.http.post(environment.fileUploadApiUrl, formData);
  }
}
