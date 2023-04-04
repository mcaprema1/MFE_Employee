import {Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatastoreService, getEmployees, Employee, filteredEmloyeeSelector, saveEmployee } from 'datastore'

@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.scss']
})
export class EmployeeformComponent {
  registerForm: FormGroup | any;
  // public submitted = false;
 
  fullList: any

  constructor(private store: Store, private formBuilder: FormBuilder, private http: HttpClient,
    private dataservice : DatastoreService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      empId: ['', Validators.required],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', Validators.required],
      emailID: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      address: [''],
      Active: [true]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
    const requestOptions: Object = {
      responseType: 'text',
      'Content-Type': 'application/json'
    }

    this.dataservice.postData(this.registerForm.value).subscribe
    ({
      next: (res) => {
        let temp = JSON.parse(res)
        this.store.dispatch(saveEmployee({ employees: temp }));
        this.onReset()
      },
      error: (err) => console.log("err : ", err)
    })
  }
  else{
    alert("Please fill form with correct details")
  }
  }

  onReset() {
    // this.submitted = false;
    this.registerForm.reset();
  }

  
}
