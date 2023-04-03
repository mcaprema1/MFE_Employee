import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { DatastoreService, Employee, employeesReducer, saveEmployee } from 'datastore';
import { AppState } from 'projects/datastore/src/lib/app.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { EmployeeformComponent } from './employeeform.component';

describe('EmployeeformComponent', () => {
  let component: EmployeeformComponent;
  let fixture: ComponentFixture<EmployeeformComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  
  let store: Store<AppState>;
  interface EmployeeState {
    allEmployees: Employee[];
  //   selectedEmployee: Employee;
  }
  const initialState: EmployeeState = {
      allEmployees: [],
    };
  const emp= {
      "empId" : "ACE10252",
      "first_name" : "Prema",
      "last_name" : "Palanisamy",
      "emailID" : "Prema@gmail.com  ",
      "mobile" : 9865433214,
      "address" : "Omr, Chennai",
      "Active" : true,
      "projectId":""};
  let http : HttpClient
  let SERVER_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/employee/save';
  let service: DatastoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeformComponent ],
      imports: [StoreModule.forRoot(
        { employees: employeesReducer },
        {}),
        HttpClientModule, FormsModule, ReactiveFormsModule
      ],
      providers :[HttpClient, DatastoreService]
    })
    .compileComponents().then(() =>{
      fixture = TestBed.createComponent(EmployeeformComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(EmployeeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    component.registerForm.controls.empId.setValue('');
    component.registerForm.controls.first_name.setValue('');
    component.registerForm.controls.last_name.setValue('');
    component.registerForm.controls.emailID.setValue('');
    component.registerForm.controls.mobile.setValue('');
    component.registerForm.controls.address.setValue('');
    component.registerForm.controls.Active.setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('Test a form group elements count', () =>{
    const formelement= fixture.debugElement.nativeElement.querySelector('#registerForm');
    const inputElements = formelement.querySelectorAll('input');
    expect(inputElements.length).toEqual(6)
  })

  it('Test Employee Id field validity', () => {
    const empId = component.registerForm.controls.empId;
    expect(empId.valid).toBeFalsy();
    empId.setValue('');
    expect(empId.hasError('required')).toBeTruthy();
  });

  it('Test First Name field validity', () => {
    const first_name = component.registerForm.controls.first_name;
    expect(first_name.valid).toBeFalsy();
    first_name.setValue('');
    expect(first_name.hasError('required') ).toBeTruthy();
  });

  it('Test last Name field validity', () => {
    const last_name = component.registerForm.controls.last_name;
    expect(last_name.valid).toBeFalsy();
    last_name.setValue('');
    expect(last_name.hasError('required') ).toBeTruthy();
  });

  it('should call onSubmit method', () => {
    spyOn(component, 'onSubmit');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('Save the employee form Input', () => {
   
    const expectedAction = saveEmployee({employees: emp});
    spyOn(store, 'dispatch');
    store.dispatch(saveEmployee({employees: emp}));
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call onReset method', () => {
    spyOn(component, 'onReset');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.registerForm.value).toEqual({
      "empId" : "",
      "first_name" : "",
      "last_name" : "",
      "emailID" : "",
      "mobile" : '',
      "address" : "",
      "Active" : ''
     });
  });
});

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatastoreService]
    });

    service = TestBed.inject(DatastoreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should save data via POST', () => {
    service.postData(emp).subscribe(data  => {
      console.log("ddd : ", data, JSON.stringify(emp));      
      expect(data).toEqual(JSON.stringify(emp));
    });
    const req = httpMock.expectOne(SERVER_URL);
    expect(req.request.method).toBe('POST');
    expect(JSON.stringify(req.request.body)).toEqual(JSON.stringify(emp));
    req.flush(emp);
  });
});
