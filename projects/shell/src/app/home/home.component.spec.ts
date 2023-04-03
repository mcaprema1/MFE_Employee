import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { employeesReducer, EmployeeState, projectReducer, ProjectState,
  employeesSelector, 
  DatastoreService,
  saveEmployee,
  Employee,
  saveProject,
  projectSelector} from 'datastore';
import { Store, provideStore } from '@ngrx/store';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { AppState, employees } from 'projects/datastore/src/lib/app.interface';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store<AppState>;
  let service: DatastoreService;
  let httpMock: HttpTestingController;
  let actualData : any=[];

  const empMockData ={
    allEmployees: [
      { "empId" : "ACE10252", "first_name" : "Prema", "last_name" : "Palanisamy", "emailID" : "Prema@gmail.com  ",
        "mobile" : 9865433214, "address" : "Omr, Chennai", "Active" : true, "projectId":""},
      { "empId" : "ACE101025", "first_name" : "Ram", "last_name" : "Santhanam", "emailID" : "ram@gmail.com  ",
        "mobile" : 9876524212, "address" : "PA, USA", "Active" : true, "projectId":""},
      { "empId" : "ACE9876", "first_name" : "Thithika", "last_name" : "Senthilkumar", "emailID" : "thithika@gmail.com  ",
        "mobile" : 9999999999, "address" : "Omr, Chennai", "Active" : true, "projectId":""},
      { "empId" : "ACE1100", "first_name" : "Makanth", "last_name" : "Senthilkumar", "emailID" : "makanth@gmail.com  ",
        "mobile" : 7777777777, "address" : "Medavakkam, Chennai", "Active" : true, "projectId":""}  
  ] }
//   projects: { allProjects :[
//         { "projectId" : "P1234", "project_name" : "f2b", "description" : "FARM2BAG" },
//         { "projectId" : "P1235", "project_name" : "SUPPLIER PORTAL", "description" : "SUPPLIER PORTAL" },
//       ]}
// };
// const initialState : EmployeeState= {
//    allEmployees:[
//     { "empId" : "ACE10252", "first_name" : "Prema", "last_name" : "Palanisamy", "emailID" : "Prema@gmail.com  ",
//       "mobile" : 9865433214, "address" : "Omr, Chennai", "Active" : true, "projectId":""},
//     { "empId" : "ACE101025", "first_name" : "Ram", "last_name" : "Santhanam", "emailID" : "ram@gmail.com  ",
//       "mobile" : 9876524212, "address" : "PA, USA", "Active" : true, "projectId":""},
//     { "empId" : "ACE9876", "first_name" : "Thithika", "last_name" : "Senthilkumar", "emailID" : "thithika@gmail.com  ",
//       "mobile" : 9999999999, "address" : "Omr, Chennai", "Active" : true, "projectId":""},
//     { "empId" : "ACE1100", "first_name" : "Makanth", "last_name" : "Senthilkumar", "emailID" : "makanth@gmail.com  ",
//       "mobile" : 7777777777, "address" : "Medavakkam, Chennai", "Active" : true, "projectId":""}  
// ] };

interface EmployeeState {
  allEmployees: Employee[];
//   selectedEmployee: Employee;
}
const initialState: EmployeeState = {
    allEmployees: [],
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports :[
        StoreModule.forRoot(
          { employees: employeesReducer,  projects : projectReducer },
          {}),
          HttpClientModule
      ],  
      providers: [
        // provideStore({initialState}),
        DatastoreService
      ],
    })
    .compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select Employee data from the store', () => {
   let expectedData = [
      { "empId" : "ACE10252", "first_name" : "Prema", "last_name" : "Palanisamy", "emailID" : "Prema@gmail.com  ",
        "mobile" : 9865433214, "address" : "Omr, Chennai", "Active" : true, "projectId":""},
      { "empId" : "ACE101025", "first_name" : "Ram", "last_name" : "Santhanam", "emailID" : "ram@gmail.com  ",
        "mobile" : 9876524212, "address" : "PA, USA", "Active" : true, "projectId":""},
      { "empId" : "ACE9876", "first_name" : "Thithika", "last_name" : "Senthilkumar", "emailID" : "thithika@gmail.com  ",
        "mobile" : 9999999999, "address" : "Omr, Chennai", "Active" : true, "projectId":""},
      { "empId" : "ACE1100", "first_name" : "Makanth", "last_name" : "Senthilkumar", "emailID" : "makanth@gmail.com  ",
        "mobile" : 7777777777, "address" : "Medavakkam, Chennai", "Active" : true, "projectId":""}
    ];
    const expectedData1 = 
      { "empId" : "ACE10252", "first_name" : "Prema", "last_name" : "Palanisamy", "emailID" : "Prema@gmail.com  ",
        "mobile" : 9865433214, "address" : "Omr, Chennai", "Active" : true, "projectId":""}
    const expectedData2 = 
    { "empId" : "ACE101025", "first_name" : "Ram", "last_name" : "Santhanam", "emailID" : "ram@gmail.com  ",
    "mobile" : 9876524212, "address" : "PA, USA", "Active" : true, "projectId":""}
    const expectedData3 = 
    { "empId" : "ACE9876", "first_name" : "Thithika", "last_name" : "Senthilkumar", "emailID" : "thithika@gmail.com  ",
    "mobile" : 9999999999, "address" : "Omr, Chennai", "Active" : true, "projectId":""}
    const expectedData4 = 
    { "empId" : "ACE1100", "first_name" : "Makanth", "last_name" : "Senthilkumar", "emailID" : "makanth@gmail.com  ",
        "mobile" : 7777777777, "address" : "Medavakkam, Chennai", "Active" : true, "projectId":""}

    store.dispatch(saveEmployee({employees: expectedData1}));
    store.dispatch(saveEmployee({employees: expectedData2}));
    store.dispatch(saveEmployee({employees: expectedData3}));
    store.dispatch(saveEmployee({employees: expectedData4}));
    store.select(employeesSelector).subscribe(data => {
      actualData = data;
    });
    expect(actualData).toEqual(expectedData);

  //   const fixture1 = TestBed.createComponent(HomeComponent);
  //   const component1 = fixture1.componentInstance;
  // const table = fixture1.nativeElement.querySelector('table');
   
  //   fixture.detectChanges();
  //   const tableRows = fixture.nativeElement.querySelectorAll('tr');
  //   const rows = table?.rows; // use optional chaining operator to check if rows exists
  // expect(rows?.length).toBe(3);
  //   console.log("rows length : ", tableRows.length, expectedData.length);
    
  //   let headerRow = tableRows[0];
  //     expect(headerRow.cells[0].innerHTML).toBe('empId');
  //     expect(headerRow.cells[1].innerHTML).toBe('first_name');
  //     expect(headerRow.cells[2].innerHTML).toBe('last_name');

  //     // Data rows
  //     let row1 = tableRows[1];
  //     expect(row1.cells[0].innerHTML).toBe('ACE1100');
  //     expect(row1.cells[1].innerHTML).toBe('Makanth');
  //     expect(row1.cells[2].innerHTML).toBe('Senthilkumar');

  //   expect(tableRows.length).toBe(2);
  });

  it('should select Project data from the store', () => {
    let expectedData = [
       { projectId : "p1234", project_name : "f2b", description : "farm2bag"},
       { projectId : "p1235", project_name : "Supplier Portal", description : "Supplier Portal"},
       { projectId : "p1236", project_name : "KP", description : "Keerthi Pumps"},
     ];
     const expectedData1 =  { projectId : "p1234", project_name : "f2b", description : "farm2bag"}
     const expectedData2 = { projectId : "p1235", project_name : "Supplier Portal", description : "Supplier Portal"}
     const expectedData3 = { projectId : "p1236", project_name : "KP", description : "Keerthi Pumps"}
 
     store.dispatch(saveProject({projects: expectedData1}));
     store.dispatch(saveProject({projects: expectedData2}));
     store.dispatch(saveProject({projects: expectedData3}));
     let actualData : any=[];
     store.select(projectSelector).subscribe(data => {
       actualData = data;
     });
     console.log("dddddd : ", actualData);
     console.log("expectedData", expectedData);
     expect(actualData).toEqual(expectedData);
     // expect(store.dispatch).toHaveBeenCalledWith(getData());
   });

  
});
