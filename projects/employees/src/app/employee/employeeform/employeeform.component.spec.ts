import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { employeesReducer } from 'datastore';

import { EmployeeformComponent } from './employeeform.component';

describe('EmployeeformComponent', () => {
  let component: EmployeeformComponent;
  let fixture: ComponentFixture<EmployeeformComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeformComponent ],
      imports: [StoreModule.forRoot(
        { employees: employeesReducer },
        {}),
      HttpClientModule, 
    FormsModule, ReactiveFormsModule]
    })
    .compileComponents().then(() =>{
      fixture = TestBed.createComponent(EmployeeformComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });

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

  // it('Test  field validity', () => {
  //   const emailId = component.registerForm.controls.emailId;
  //   expect(emailId.valid).toBeFalsy();
  //   emailId.setValue('');
  //   expect(emailId.hasError('required') ).toBeTruthy();
  // });

  // it('Test first name has min length 3', () =>{
  //   const formelement= fixture.debugElement.nativeElement.querySelector('#registerForm')[1];
  //   const Inputvalue= component.registerForm.get('first_name')
  //   expect(formelement.value).toBeGreaterThan(2)
  // })

});
