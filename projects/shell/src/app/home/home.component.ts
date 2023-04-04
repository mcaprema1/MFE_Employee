import { Component, ViewChild, ElementRef, PipeTransform } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { debounceTime, map, distinctUntilChanged, filter, startWith,
   switchMap, tap, delay } from "rxjs/operators";
import { DecimalPipe } from "@angular/common"
import { Store , select} from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Employee, Project, employeesReducer, employeesSelector, getEmployees, projectSelector, updateEmployee, saveEmployee} from 'datastore'
import { Observable } from 'rxjs';
import { employees } from 'projects/datastore/src/lib/app.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DecimalPipe]
})
export class HomeComponent {

  title = 'ListAll';
  public listOfEmployee : any = [];
  public listOfProject : any =[];
  public fullList : any
  full : any =[];
  employeesList : Employee[] =[];
  employees$ :  Observable<Employee[]> | undefined
  projects$ :  Observable<Project[]> | undefined
  filteredEmployee$ : Observable<Employee[]> | undefined;
  filter = new FormControl("");
  categories$!: Observable<Employee[]>;
  public len = 0;
  public len1 = 0;
  public projectInput =''

  Employeelist$:Observable<Employee[]> | any;
  constructor(private store: Store, pipe : DecimalPipe) {
    // this.employeesList =[];
    this.employees$ = this.store.select(employeesSelector);
    this.projects$ = this.store.select(projectSelector);
    this.store.select(employeesSelector).subscribe(data =>{
      this.employeesList = data
      this.len = data.length
      // console.log("length : ", data.length, this.listOfEmployee);
    })
    this.store.select(projectSelector).subscribe(data =>{
      this.listOfProject = data
      this.len1 = data.length
      // console.log("project length : ", data.length, this.listOfProject );
    })
    this.filteredEmployee$ = this.filter.valueChanges.pipe(
      startWith(""),
      distinctUntilChanged(),
      debounceTime(1000),
      map(text => {
       let text1= text ? text : '';
        return this.search(text1, pipe);
      })
    );
    // console.log("jjj:", this.employees$, this.filteredEmployee$);
    // this.empStores = store.select('empStore');
  }
  
  ngOnInit() {
    // this.Employeelist$ = this.store.pipe(select(selectEmployees));
  }

  
search(text: string, pipe: PipeTransform) {
  // console.log("inn search call", text)
  let temp = this.employeesList.filter(list  => {
    // console.log("fff : ", list)
    const term = text.toLowerCase();
    return (
      list.empId.toLowerCase().includes(term) ||
      list.first_name.toLowerCase().includes(term) ||
      list.last_name.toLowerCase().includes(term) ||
      list.emailID.toLowerCase().includes(term) ||
      list.address.toLowerCase().includes(term) ||
      list.mobile.toString().includes(term) ||
      String(list.Active) === term
      // list.Active.filter(item => Boolean(item)) ||
      // list.Active.valueOf()? String(list.Active).includes('true') : String(list.Active).includes('false')  ||
      // pipe.transform(list.mobile).includes(term)
    );
  });
  console.log("temo : ", temp);
  
return temp
}

selectedProject(event : any, row : any, i : number){
  let updateData = { row : row, index: i, projectId:event.target.value }
  this.store.dispatch(updateEmployee({employees : updateData}));
  this.store.select(employeesSelector).subscribe(data =>{
    this.listOfEmployee = data
    this.len = data.length
  })
}
}
