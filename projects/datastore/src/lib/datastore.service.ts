import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

    private apiUrl = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/employee/save';
    private projectapiUrl = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/project/save';
    public requestOptions: Object = {
      responseType: 'text',
      'Content-Type': 'application/json'
    }
  constructor(private http: HttpClient) {}

  postData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, this.requestOptions)
  }

  postProjectData(data: any): Observable<any> {
    return this.http.post(this.projectapiUrl, data, this.requestOptions)
  }
  
  
  
}
