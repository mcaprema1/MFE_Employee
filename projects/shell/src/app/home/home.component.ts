import { Component, ViewChild, ElementRef, PipeTransform } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { debounceTime, map, distinctUntilChanged, filter, startWith,
   switchMap, tap, delay } from "rxjs/operators";
import { DecimalPipe } from "@angular/common"
import { Store , select} from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Employee, Project, employeesReducer, employeesSelector, getEmployees} from 'datastore'
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
  employeesList : any =[];
  employees$ :  Observable<Employee[]> | undefined
  filteredEmployee$ : Observable<Employee[]> | undefined;
  filter = new FormControl("");
  categories$!: Observable<Employee[]>;

  Employeelist$:Observable<Employee[]> | any;
  constructor(private store: Store, pipe : DecimalPipe) {
    // this.employeesList =[];
    this.employees$ = this.store.select(employeesSelector);
    // this.filteredEmployee$ = this.filter.valueChanges.pipe(
    //   startWith(""),
    //   distinctUntilChanged(),
    //   debounceTime(1000),
    //   map(text => {
    //    let text1= text ? text : '';
    //     return this.search(text1, pipe);
    //   })
    // );
    console.log("jjj:", this.employees$, this.filteredEmployee$);
    // this.empStores = store.select('empStore');
  }
  
  ngOnInit() {
    // this.Employeelist$ = this.store.pipe(select(selectEmployees));
  }

  
search(text: string, pipe: PipeTransform) {
  console.log("inn search call", text)
  return true
// return this.employeesList.filter(list  => {
//   // console.log("fff : ", list)
//   const term = text.toLowerCase();
//   return (
//     list.empId.toLowerCase().includes(term) ||
//     list.first_name.toLowerCase().includes(term) ||
//     list.last_name.toLowerCase().includes(term) ||
//     list.emailID.toLowerCase().includes(term) ||
//     list.address.toLowerCase().includes(term) ||
//     list.mobile.toString().includes(term)
//     // list.Active.filter(item => Boolean(item)) ||
//     // list.Active.valueOf()? String(list.Active).includes('true') : String(list.Active).includes('false')  ||
//     // pipe.transform(list.mobile).includes(term)
//   );
// });
// }

}

saveToStore(){
  // let xxx= {'empid' : '1'}
  //   this.store.dispatch(getEmployees({employees : xxx}));
  // this.viewStore=true;
}

selectedProject(event : any, row : any, i : number){
  row.projectId=event.target.value
  console.log("vvv : ", row, this.employeesList);
}
}
