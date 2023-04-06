import { Component, ViewChild, ElementRef, PipeTransform, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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
  providers: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  title = 'ListAll';
  public listOfEmployee : any = [];
  public listOfProject : any =[];
  public fullList : any
  full : any =[];
  employeesList : Employee[] =[];
  employees$ :  Observable<Employee[]> | any
  projects$ :  Observable<Project[]> | any
  filteredEmployee$ : Observable<Employee[]> | undefined;
  filter = new FormControl("");
  categories$!: Observable<Employee[]>;
  public len = 0;
  public len1 = 0;
  public projectInput ='';

  Employeelist$:Observable<Employee[]> | any;
  constructor(private store: Store, pipe : DecimalPipe, private cf : ChangeDetectorRef) {
    this.employees$ = this.store.select(employeesSelector);
    this.projects$ = this.store.select(projectSelector);
    this.store.select(employeesSelector).subscribe(data =>{
      this.employeesList = data
      this.len = data.length
    })
    this.store.select(projectSelector).subscribe(data =>{
      this.listOfProject = data
      this.len1 = data.length
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

  }
  
  ngOnInit() {
    // this.employees$.subscribe(data => console.log("employees$ : ", data))
    
  }
  
search(text: string, pipe: PipeTransform) {
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
      // pipe.transform(list.mobile).includes(term)
    );
  });
return temp
}

selectedProject( projectInput : any, row : any, i : number){
  let updateData = { row : row, index: i, projectId:projectInput.target.value }
  this.store.dispatch(updateEmployee({employees : updateData}));
  this.employees$ = this.store.select(employeesSelector);
  this.cf.detectChanges()
}
// this.store.select(employeesSelector).subscribe(data =>{
  //   this.listOfEmployee = data
  //   this.len = data.length
  // })
}
