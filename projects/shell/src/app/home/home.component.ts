import { Component, ViewChild, ElementRef, PipeTransform, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { debounceTime, map, distinctUntilChanged, filter, startWith,
   switchMap, tap, delay } from "rxjs/operators";
import { DecimalPipe } from "@angular/common"
import { Store , select} from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Employee, Project, employeesReducer, employeesSelector, getEmployees, projectSelector, updateEmployee, saveEmployee} from 'datastore'
import { Observable, of , Subject} from 'rxjs';
import { employees } from 'projects/datastore/src/lib/app.interface';
import { NgxSpinnerService } from "ngx-spinner";

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
  employees$ :  Observable<Employee[]> | undefined
  projects$ :  Observable<Project[]> | any
  filteredEmployees$: Observable<Employee[]>;
  filter = new FormControl("");
  public len = 0;
  public len1 = 0;
  public projectInput ='';
  constructor(private store: Store, pipe : DecimalPipe, private cf : ChangeDetectorRef,
    private spinner: NgxSpinnerService) {
    this.store.select(employeesSelector).subscribe(data =>{
      let temp= of(data)
      this.employees$  = temp
      this.employeesList = data
      this.len = data.length
    });
    this.projects$ = this.store.select(projectSelector);
    this.store.select(projectSelector).subscribe(data =>{
      this.listOfProject = data
      this.len1 = data.length
    })
    this.filteredEmployees$ = this.filter.valueChanges.pipe(
      startWith(""),
      distinctUntilChanged(),
      debounceTime(1000),
      map(text => {
       let text1= text ? text : '';
        return this.search(text1);
      })
    );
  }
  
  ngOnInit() {
  }
  
search(text: string) {
  let temp = this.employeesList.filter(list  => {    
    const term = text.toLowerCase();
    // console.log("fff : ", term, list)
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

selectedProject( event : any, row : any, i : number){
  let updateData = { row : row, index: i, projectId:event.target.value }
  this.store.dispatch(updateEmployee({employees : updateData}));
  // this.spinner.show();
    this.filteredEmployees$= this.filter.valueChanges.pipe(
      startWith(""),
      distinctUntilChanged(),
      debounceTime(1000),
      map(text => {
       let text1= text ? text : '';
        return this.search(text1);
      })
    );
    // this.spinner.hide();
}


}
