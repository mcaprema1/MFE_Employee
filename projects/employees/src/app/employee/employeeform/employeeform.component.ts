import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatastoreService, getEmployees, Employee, filteredEmloyeeSelector,saveEmployee} from 'datastore'

@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.scss']
})
export class EmployeeformComponent {
  employees$!: Observable<Employee[]>;

  constructor( private store: Store,private formBuilder: FormBuilder,  private http: HttpClient) {
    // this.employees$ = this.store.pipe(filteredEmloyeeSelector);
  }

  // ngOnInit(): void {
  //   const movies = this.dataService.getMovies();
  //   this.store.dispatch(getMovies({ movies }));
  // }

  registerForm: FormGroup | any;
  submitted = false;
  SERVER_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/employee/save';
  fullList :any

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          empId: ['', Validators.required],
          first_name: ['', [Validators.required, Validators.minLength(3)]],
          last_name: ['', Validators.required],
          emailID: ['', [Validators.required, Validators.email]],
          mobile: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
          address: [''],
          Active:['']
      });
      // const employees = this.dataService.getEmployees();
      // this.store.dispatch(getEmployees({ employees }));
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log("INSIDE : ", this.registerForm.invalid);
    
      if (this.registerForm.invalid) {
              return;
      }
      this.submitted = true;
      const requestOptions: Object = {
         responseType: 'text',
        'Content-Type': 'application/json'
      }
  this.http.post<any>(this.SERVER_URL, this.registerForm.value, requestOptions).subscribe
  ({
      next : (res) => {
          let temp = JSON.parse(res)
          console.log("res : ", temp);
          // this.store.dispatch(new EmpAction(temp));
          this.store.dispatch(saveEmployee({employees: temp}));
      },
      error : (err) => console.log("err : ", err)
  })
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

  view(){
      // this.store.dispatch(new EmpActions.getEmployees('kk'));
      this.store.subscribe((data) =>{
          // console.log("view store 1: ", data )
          // this.fullList = data.empStore;
          console.log("view store 67: ", data );
        });
  }
}
