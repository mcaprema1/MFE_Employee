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
import { of } from 'rxjs';

describe('EmployeeformComponent', () => {
  let component: EmployeeformComponent;
  let fixture: ComponentFixture<EmployeeformComponent>;
  let debugElement: DebugElement;
  let el: HTMLElement;
  let httpMock: HttpTestingController;
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
      "projectId":""
    };
  let http : HttpClient
  let SERVER_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/employee/save';
  let service: DatastoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeformComponent ],
      imports: [StoreModule.forRoot(
        { employees: employeesReducer },
        {}),
        HttpClientModule, FormsModule, ReactiveFormsModule,HttpClientTestingModule
      ],
      providers :[HttpClient, DatastoreService]
    })
    .compileComponents()
    .then(() =>{
      fixture = TestBed.createComponent(EmployeeformComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.css('form'));
      el = debugElement.nativeElement;
    });
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(EmployeeformComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DatastoreService);
    httpMock = TestBed.inject(HttpTestingController)
    fixture.detectChanges();
  });

    afterEach(() => {
    // httpMock.verify();
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

  it('should render title', () => {
    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain('Employee Details');
  });

  it('should show an error message when empId is not entered', () => {
    const input = fixture.debugElement.query(By.css('#outer'));
    input.nativeElement.value = '';
    const empid = component.registerForm.controls.empId;
    expect(empid.valid).toBeFalsy();
    empid.setValue('');
    const empIdControl = component.registerForm.get('empId');
    empIdControl.setErrors({ required: true });
    empIdControl.markAsTouched();
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    const errorMessage = fixture.debugElement.query(By.css('#innermost')).nativeElement.textContent;
    expect(errorMessage).toContain('Employee ID is required');
  });

  it('Test First Name field validity', async() => {
    const first_name = component.registerForm.controls.first_name;
    expect(first_name.valid).toBeFalsy();
    first_name.setValue('');
    expect(first_name.hasError('required') ).toBeTruthy();
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
    spyOn(component, 'onSubmit');
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    const expectedAction = saveEmployee({employees: emp});
    spyOn(store, 'dispatch');
    store.dispatch(saveEmployee({employees: emp}));
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  // it('should call onReset method', () => {
  //   spyOn(component, 'onReset');
  //   const button = fixture.debugElement.nativeElement.querySelector('button');
  //   button.click();
  //   expect(component.registerForm.value).toEqual({
  //     "empId" : "",
  //     "first_name" : "",
  //     "last_name" : "",
  //     "emailID" : "",
  //     "mobile" : '',
  //     "address" : "",
  //     "Active" : true,
  //     "projectId" :''
  //    });
  // });
  it('Test form valid and invalid', () => {
      component.registerForm.controls.empId.setValue("P1234");
      component.registerForm.controls.first_name.setValue("Prema");
      component.registerForm.controls.last_name.setValue("prema");
      component.registerForm.controls.emailID.setValue("prema@gmail.com");
      component.registerForm.controls.mobile.setValue(986543324666);
      component.registerForm.controls.address.setValue("omr, chennai");
      component.registerForm.controls.Active.setValue(true);
      expect(component.registerForm.valid).toBeFalsy();
      

      component.registerForm.controls.empId.setValue("P1234");
      component.registerForm.controls.first_name.setValue("Prema");
      component.registerForm.controls.last_name.setValue("prema");
      component.registerForm.controls.emailID.setValue("prema@gmail.com");
      component.registerForm.controls.mobile.setValue(9865433241);
      component.registerForm.controls.address.setValue("omr, chennai");
      component.registerForm.controls.Active.setValue(true);
      expect(component.registerForm.valid).toBeTruthy();
  });

  // it('Test alert', () => { 
  //   spyOn(window, 'alert');
  //     const form = fixture.nativeElement.querySelector('form');
  //     form.dispatchEvent(new Event('submit'));
  //     expect(window.alert).toHaveBeenCalledWith('Please fill form with correct details');
  // })

  it('should save data if form is valid', () => {
    spyOn(window, 'alert');
    component.registerForm.controls.empId.setValue("P1234");
      component.registerForm.controls.first_name.setValue("Prema");
      component.registerForm.controls.last_name.setValue("prema");
      component.registerForm.controls.emailID.setValue("prema@gmail.com");
      component.registerForm.controls.mobile.setValue(9865433241);
      component.registerForm.controls.address.setValue("omr, chennai");
      component.registerForm.controls.Active.setValue(true);
      // component.registerForm.controls.projectId.setValue('p1234');
      console.log("ccc : ", component.registerForm.valid);
      expect(component.registerForm.valid).toBeTruthy();

        // service.postData(component.registerForm.value).subscribe(data  => {
        //   expect(data).toEqual(JSON.stringify(component.registerForm.value));
        // });
        // const req = httpMock.expectOne(SERVER_URL);
        // expect(req.request.method).toBe('POST');
        // expect(JSON.stringify(req.request.body)).toEqual(JSON.stringify(component.registerForm.value));
        // req.flush(emp);

      const expectedAction = saveEmployee({employees: component.registerForm.value});
      spyOn(store, 'dispatch');
      store.dispatch(saveEmployee({employees: component.registerForm.value}));
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      expect(window.alert).not.toHaveBeenCalled()
  });

  // it('should generate alert if form is invalid', () => {
  //   // spyOn(window, 'alert');
  //   component.registerForm.controls.empId.setValue("P1234");
  //   component.registerForm.controls.first_name.setValue("Prema");
  //   component.registerForm.controls.last_name.setValue("prema");
  //   component.registerForm.controls.emailID.setValue("prema@gmail.com");
  //   component.registerForm.controls.mobile.setValue(986543324666);
  //   component.registerForm.controls.address.setValue("omr, chennai");
  //   component.registerForm.controls.Active.setValue(true);
  //   console.log("cccvv : ", component.registerForm.valid);
  //   expect(component.registerForm.valid).toBeFalsy();

  //     spyOn(store, 'dispatch');
  //     expect(store.dispatch).not.toHaveBeenCalled();
  //     spyOn(window, 'alert');
  //     const form = fixture.nativeElement.querySelector('form');
  //     form.dispatchEvent(new Event('submit'));
  //     expect(window.alert).toHaveBeenCalledWith('Please fill form with correct details');
  // });

  it('should initialize form with fields', () => {
    expect(component.registerForm).toBeDefined();
    // expect(component.myForm.controls['name']).toBeDefined();
  });

  it('should reset the form when submit button is clicked', () => {
    component.registerForm.setValue({
      "empId" : "ACE10252",
      "first_name" : "Prema",
      "last_name" : "Palanisamy",
      "emailID" : "Prema@gmail.com  ",
      "mobile" : 9865433214,
      "address" : "Omr, Chennai",
      "Active" : true,
      "projectId":"p1234"
    });
    const resetButton = fixture.nativeElement.querySelector('button[type="reset"]');
    resetButton.click();
    expect(component.registerForm.value).toEqual({
      "empId" : null,
      "first_name" : null,
      "last_name" : null,
      "emailID" : null,
      "mobile" : null,
      "address" : null,
      "Active" : null,
      "projectId":null
    });
  });

  // it('should save employee data via post', () => {
  //   spyOn(service, 'postData').and.returnValue(of({
  //     "empId" : "ACE10252",
  //     "first_name" : "Prema",
  //     "last_name" : "Palanisamy",
  //     "emailID" : "Prema@gmail.com  ",
  //     "mobile" : 9865433214,
  //     "address" : "Omr, Chennai",
  //     "Active" : true,
  //     "projectId":""
  //   }));
    
  //   component.registerForm.setValue({
  //     empId : "ACE10252",
  //     first_name : "Prema",
  //     last_name : "Palanisamy",
  //     emailID: "Prema@gmail.com  ",
  //     mobile : 9865433214,
  //     address : "Omr, Chennai",
  //     Active : true,
  //     projectId: ''
  //   });
  //   component.onSubmit();
  //   const expectedAction = saveEmployee(
  //     { employees: JSON.parse
  //       ('{"empId" : "ACE10252","first_name" : "Prema", "last_name" : "Palanisamy","emailID" : "Prema@gmail.com  ","mobile" : 9865433214, "address" : "Omr, Chennai", "Active" : true, "projectId":""}') })
    
  //   // expect(service.postData).toHaveBeenCalledWith(component.registerForm.value);
  //   spyOn(store, 'dispatch');
  //   store.dispatch(saveEmployee({ employees: component.registerForm.value }));
  //   expect(store.dispatch).toHaveBeenCalledWith(expectedAction)
  //   // spyOn(component, 'onReset');
  //   // expect(component.registerForm.value).toEqual({
  //   //   empId : '',
  //   //   first_name : '',
  //   //   last_name : '',
  //   //   emailID : '',
  //   //   mobile : '',
  //   //   address : '',
  //   //   Active : '',
  //   //   projectId:''
  //   // });
  // });

  it('should save employee data via post', () => {
    const postProjectDataSpy = spyOn(service, 'postData').and.callThrough();
    component.registerForm.setValue({
          empId : "ACE10252",
          first_name : "Prema",
          last_name : "Palanisamy",
          emailID: "Prema@gmail.com",
          mobile : 9865433214,
          address : "Omr, Chennai",
          Active : true,
          projectId: ''
    });
    
    expect(component.registerForm.valid).toBeTruthy();
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();

    expect(postProjectDataSpy).toHaveBeenCalledOnceWith({
          empId : "ACE10252",
          first_name : "Prema",
          last_name : "Palanisamy",
          emailID: "Prema@gmail.com",
          mobile : 9865433214,
          address : "Omr, Chennai",
          Active : true,
          projectId: ''
    });
     
    const req = httpMock.expectOne('https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/employee/save');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(component.registerForm.value);
    
    const expectedAction = saveEmployee({ employees:{"empId" : "ACE10252","first_name" : "Prema", "last_name" : "Palanisamy","emailID" : "Prema@gmail.com","mobile" : 9865433214, "address" : "Omr, Chennai", "Active" : true, "projectId":""} })
    spyOn(store, 'dispatch');
    store.dispatch(saveEmployee({ employees: component.registerForm.value }));
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction)
  });

  it('should generate alert if form is invalid', () => {
    component.registerForm.setValue({
      "empId" : "",
      "first_name" : "P",
      "last_name" : "Palanisamy",
      "emailID" : "Prema@gmail.com",
      "mobile" : 9865433214,
      "address" : "Omr, Chennai",
      "Active" : true,
      "projectId":""
    });
    console.log("bnbnbn : ", component.registerForm.valid);
    expect(component.registerForm.valid).toBeFalsy();

    spyOn(store, 'dispatch');
    expect(store.dispatch).not.toHaveBeenCalled();
    spyOn(window, 'alert');
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    button.click();
    expect(window.alert).toHaveBeenCalledWith('Please fill form with correct details');
  });

  it('should dispatch saveEmployee action when HTTP request is successful', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    // set up HTTP response
    const response = {"empId" : "ACE10252","first_name" : "Prema", "last_name" : "Palanisamy","emailID" : "Prema@gmail.com","mobile" : 9865433214, "address" : "Omr, Chennai", "Active" : true, "projectId":""};
    spyOn(service, 'postProjectData').and.returnValue(of(JSON.stringify(response)));
  
    component.registerForm.setValue({
      empId : "ACE10252",
      first_name : "Prema",
      last_name : "Palanisamy",
      emailID: "Prema@gmail.com",
      mobile : 9865433214,
      address : "Omr, Chennai",
      Active : true,
      projectId: ''
    });

    // trigger submit button click
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    store.dispatch(saveEmployee({ employees: component.registerForm.value }));
    // assert that dispatch() was called with saveProject action and HTTP response data
    expect(dispatchSpy).toHaveBeenCalledOnceWith(saveEmployee({ employees: response }));
  });
  
});


