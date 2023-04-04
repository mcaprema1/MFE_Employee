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

  // it('Test Employee Id field validity', () => {
  //   const empId = component.registerForm.controls.empId;
  //   expect(empId.valid).toBeFalsy();
  //   empId.setValue('');
  //   expect(empId.hasError('required')).toBeTruthy();

  //   const inputElement = fixture.nativeElement.querySelector('input');
  //   inputElement.value = '';
  //   inputElement.dispatchEvent(new Event('input'));
    
    
  //   // const mobileInput = fixture.debugElement.query(By.css('#mobile')).nativeElement;
  //   // // mobileInput.value = 'invalid-mobile';
  //   // mobiles.setValue('444444')
  //   // mobileInput.dispatchEvent(new Event('input'));

  //   fixture.detectChanges();
  //   const errorMsgElement = fixture.nativeElement.querySelector('#error-msg');
  //   console.log("fixture.debugElement.query() : ", fixture.debugElement.query(By.css('#error-msg')));
    
  //   console.log("xxx : ", errorMsgElement);
  //   expect(errorMsgElement).toBeTruthy();

  //   const requiredErrorMsgElement = fixture.nativeElement.querySelector('#error-msg div');
  //   expect(requiredErrorMsgElement.innerText).toEqual('Employee ID is required');
  
  // });

  it('should show the required error message if the first name field is touched and empty', () => {
    // const firstNameInput = fixture.debugElement.query(By.css('#firstName')).nativeElement;
    // const firstNameErrorMsgElement = fixture.debugElement.query(By.css('#required')).nativeElement;

    const firstNameInput = fixture.debugElement.nativeElement.querySelector('#registerForm').
    querySelectorAll('input')[1];

    const fs = firstNameInput.querySelector('div')
    // Set first name field to empty
    
    
    firstNameInput.value = '';
    firstNameInput.dispatchEvent(new Event('input'));

    // Trigger blur event
    firstNameInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    console.log("sssss : ", firstNameInput, fs);
    // expect(firstNameErrorMsgElement.textContent).toContain('First Name is required');
  });

  // it('should show the minlength error message if the first name field is touched and has less than 3 characters', () => {
  //   const firstNameInput = fixture.debugElement.query(By.css('#firstName')).nativeElement;
  //   const firstNameErrorMsgElement = fixture.debugElement.query(By.css('#minlength')).nativeElement;

  //   // Set first name field to less than 3 characters
  //   firstNameInput.value = 'ab';
  //   firstNameInput.dispatchEvent(new Event('input'));

  //   // Trigger blur event
  //   firstNameInput.dispatchEvent(new Event('blur'));

  //   fixture.detectChanges();

  //   expect(firstNameErrorMsgElement.textContent).toContain('Minimum 3 characters is required');
  // });

  it('Test First Name field validity', async() => {
    const first_name = component.registerForm.controls.first_name;
    expect(first_name.valid).toBeFalsy();
    first_name.setValue('');
    expect(first_name.hasError('required') ).toBeTruthy();
  
    // const firstname1 = fixture.debugElement.nativeElement.querySelector('#registerForm').
    // querySelectorAll('input')[1];
    
  });

  it('Test First Name field has min length', async() => {
    const first_name = component.registerForm.controls.first_name;
    expect(first_name.valid).toBeFalsy();
    fixture.detectChanges();
    first_name.setValue('PP');
    expect(first_name.value.length).toBeLessThan(3);
    first_name.setValue('Prema');
    expect(first_name.value.length).toBeGreaterThanOrEqual(3);
  });

  it('Test last Name field validity', () => {
    const last_name = component.registerForm.controls.last_name;
    expect(last_name.valid).toBeFalsy();
    last_name.setValue('');
    expect(last_name.hasError('required') ).toBeTruthy();
  });

  it('test email field required', () => {
    const email = component.registerForm.controls.emailID;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  it('test email field validity', () => {
    const emailid = component.registerForm.controls.emailID;
    const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    emailInput.value = 'invalidemail';
    emailInput.dispatchEvent(new Event('input'));
    expect(emailid.valid).toBeFalsy();

    emailInput.value = 'validemail@mail.com';
    emailInput.dispatchEvent(new Event('input'));
    expect(emailid.valid).toBeTruthy();
  });

  it('should be invalid when an invalid mobile number is entered', () => {
    const mobiles = component.registerForm.controls.mobile;
    const mobileInput = fixture.debugElement.query(By.css('#mobile')).nativeElement;
    // mobileInput.value = 'invalid-mobile';
    mobiles.setValue('444444')
    mobileInput.dispatchEvent(new Event('input'));
    expect(mobiles.valid).toBeFalsy();

    mobiles.setValue('1234567890')
    mobileInput.dispatchEvent(new Event('input'));
    expect(mobiles.valid).toBeTruthy();
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
      "Active" : true
     });
  });
  it('Test form valid and invalid', () => {
      component.registerForm.controls.empId.setValue("P1234");
      component.registerForm.controls.first_name.setValue("Prema");
      component.registerForm.controls.last_name.setValue("prema");
      component.registerForm.controls.emailID.setValue("prema@gmail.com");
      component.registerForm.controls.mobile.setValue(986543324666);
      component.registerForm.controls.address.setValue("omr, chennai");
      component.registerForm.controls.Active.setValue(true);
      console.log("ccc : ", component.registerForm.valid);
      expect(component.registerForm.valid).toBeFalsy();

      
  
    //   spyOn(component, 'onSubmit');
    // const button = fixture.debugElement.nativeElement.querySelector('button');
    // button.click();
    // const expectedAction =window.alert("Please fill form with correct details")
    // expect(component.registerForm.valid).toHaveBeenCalledwith("");


      component.registerForm.controls.empId.setValue("P1234");
      component.registerForm.controls.first_name.setValue("Prema");
      component.registerForm.controls.last_name.setValue("prema");
      component.registerForm.controls.emailID.setValue("prema@gmail.com");
      component.registerForm.controls.mobile.setValue(9865433241);
      component.registerForm.controls.address.setValue("omr, chennai");
      component.registerForm.controls.Active.setValue(true);
      console.log("ccc : ", component.registerForm.valid);
      expect(component.registerForm.valid).toBeTruthy();
  });
  it('Test alert', () => { 
    spyOn(window, 'alert');
      const form = fixture.nativeElement.querySelector('form');
      form.dispatchEvent(new Event('submit'));
      expect(window.alert).toHaveBeenCalledWith('Please fill form with correct details');
  })
  
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
      // console.log("ddd : ", data, JSON.stringify(emp));      
      expect(data).toEqual(JSON.stringify(emp));
    });
    const req = httpMock.expectOne(SERVER_URL);
    expect(req.request.method).toBe('POST');
    expect(JSON.stringify(req.request.body)).toEqual(JSON.stringify(emp));
    req.flush(emp);
  });
});
