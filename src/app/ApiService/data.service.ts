import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppError } from '../Common/app-error';
import { NotFoundError } from '../Common/not-found-eror';
import { BadRequest } from '../Common/bad-request-error';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class DataService {
  private headers: Headers = new Headers();
  constructor(private url: string, public http: HttpClient) {
  }

  GetAll(): Observable<any> {
    return this.http.get(this.url)
      .catch(this.handleError);
  }

  Create(resource): Observable<any> {
    console.log('data create metod', resource, 'url:', this.url);
    return this.http.post(this.url, resource, {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
    }).catch(this.handleError);
  }

  Delete(id: any): Observable<any> {
    const opts = { params: new HttpParams().set('Id', id) };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/html; charset=UTF-8'
      })
    };
    return this.http.delete(this.url + '/' + id, httpOptions)
      .catch(this.handleError);
  }

  Update(resource): Observable<any> {
    const opts = { params: new HttpParams().set('Id', resource.ID) };
    return this.http.put(this.url, resource, opts)
      .catch(this.handleError);
    //this.http.put
  }

  public handleError(error: Response): Observable<Error> {
    console.log('here the error', error);
    if (error.status === 404) {
      return Observable.throw(new NotFoundError(error))
    }

    if (error.status === 400) {
      return Observable.throw(new BadRequest(error))
    }

    return Observable.throw(new AppError(error));
  }
}
