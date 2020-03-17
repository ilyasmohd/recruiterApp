import { Injectable } from '@angular/core';
import { DataService} from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrentOpeningsService extends DataService {
  constructor(http:HttpClient) {
    super('http://localhost:63164/api/CurrentOpenings', http);
   }
}
