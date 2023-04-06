import { TestBed } from '@angular/core/testing';

import { DatastoreService } from './datastore.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('DatastoreService', () => {
  let service: DatastoreService;
  let httpMock: HttpTestingController;
  const emp= {
    "empId" : "ACE10252",
    "first_name" : "Prema",
    "last_name" : "Palanisamy",
    "emailID" : "Prema@gmail.com  ",
    "mobile" : 9865433214,
    "address" : "Omr, Chennai",
    "Active" : true,
    "projectId":""};
    let SERVER_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/employee/save';

    const proj= {
      "projectId" : "P1234",
      "project_name" : "f2b",
      "description" : "FARM2BAG",
     };
      let PROJ_SERVER_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/project/save';


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatastoreService, HttpClient]
    });
    service = TestBed.inject(DatastoreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created dddd', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should save EMPLOYEE data via POST', () => {
    service.postData(emp).subscribe(data  => {
      expect(data).toEqual(JSON.stringify(emp));
    });
    const req = httpMock.expectOne(SERVER_URL);
    expect(req.request.method).toBe('POST');
    expect(JSON.stringify(req.request.body)).toEqual(JSON.stringify(emp));
    req.flush(emp);
  });

  it('should save PROJECT data via POST', () => {

    service.postProjectData(proj).subscribe(data  => {
      console.log("ddd : ", data, JSON.stringify(proj));
      expect(data).toEqual(JSON.stringify(proj));
    });
    const req = httpMock.expectOne(PROJ_SERVER_URL);
    expect(req.request.method).toBe('POST');
    expect(JSON.stringify(req.request.body)).toEqual(JSON.stringify(proj));
    req.flush(proj);
  });
  

});
