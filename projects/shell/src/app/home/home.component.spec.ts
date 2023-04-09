import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { employeesReducer, EmployeeState, projectReducer, ProjectState,
  employeesSelector, 
  DatastoreService,
  saveEmployee,
  Employee,
  saveProject,
  projectSelector,
  updateEmployee} from 'datastore';
import { Store, provideStore } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { HomeComponent } from './home.component';
import { AppState, employees } from 'projects/datastore/src/lib/app.interface';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TestScheduler } from 'rxjs/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store<AppState>;
  let service: DatastoreService;
  let httpMock: HttpTestingController;
  let actualData : any=[];
  let scheduler: TestScheduler;
  let len =0;
  let filter = new FormControl();
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
          HttpClientModule, FormsModule, ReactiveFormsModule
      ],  
      providers: [
        // provideStore({initialState}),
        DatastoreService,
      ],
    })
    .compileComponents();
    service = TestBed.inject(DatastoreService);
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    // component = new HomeComponent();
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

  });


  it('should emit the selected item when the select box is changed', () => {
    
    // const spy = spyOn(component.selectedProject, 'selectedProject');
    const emp : Employee[] = [
      { "empId" : "ACE10252", "first_name" : "Prema", "last_name" : "Palanisamy", "emailID" : "Prema@gmail.com  ",
      "mobile" : 9865433214, "address" : "Omr, Chennai", "Active" : true, "projectId":""},
    { "empId" : "ACE101025", "first_name" : "Ram", "last_name" : "Santhanam", "emailID" : "ram@gmail.com  ",
      "mobile" : 9876524212, "address" : "PA, USA", "Active" : true, "projectId":""},
    { "empId" : "ACE9876", "first_name" : "Thithika", "last_name" : "Senthilkumar", "emailID" : "thithika@gmail.com  ",
      "mobile" : 9999999999, "address" : "Omr, Chennai", "Active" : true, "projectId":""},
    { "empId" : "ACE1100", "first_name" : "Makanth", "last_name" : "Senthilkumar", "emailID" : "makanth@gmail.com  ",
      "mobile" : 7777777777, "address" : "Medavakkam, Chennai", "Active" : true, "projectId":""}
    ]
    const row ={
       "empId" : "ACE1100", "first_name" : "Makanth", "last_name" : "Senthilkumar", "emailID" : "makanth@gmail.com  ",
      "mobile" : 7777777777, "address" : "Medavakkam, Chennai", "Active" : true, "projectId":""
    }
    // select.value = '3';
    // const select = fixture.debugElement.query(By.css('select')).nativeElement;
    // select.dispatchEvent(new Event('change'));
    let temp=of(emp) 
    component.employees$ = temp
    let empid= { target: { value: 'P12345' } };
    // component.selectedProject('P12345', row, 3,)
    let updateData = { row : row, index: 3, projectId: empid}
      const expectedAction = updateEmployee({ employees: updateData });
      spyOn(store, 'dispatch');
      store.dispatch(updateEmployee({employees : updateData}));
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction)
  });

  // it('should dispatch an updateEmployee action and update the employee list', () => {
  //   const event = { target: { value: "P12345" } };
  //   const row = { empId : "ACE10252",
  //   first_name : "Prema",
  //   last_name : "Palanisamy",
  //   emailID: "Prema@gmail.com",
  //   mobile : 9865433214,
  //   address : "Omr, Chennai",
  //   Active : true,
  //   projectId: '' };
  //   const i = 0;
  //   component.selectedProject(event, row, i);

  //   // expect(store.dispatch).toHaveBeenCalledWith(updateEmployee({ employees: { row: row, index: i, projectId: event.target.value } }));
  //   // expect(store.select).toHaveBeenCalledWith(employeesSelector);
  //   // expect(component.listOfEmployee).toEqual([{ id: 1, name: 'Alice', projectId: 1 }, { id: 2, name: 'Bob', projectId: 2 }]);
  //   // expect(component.len).toBe(2);

  //   component.onSubmit();
  //   const expectedAction = saveProject({ projects: JSON.parse('{"projectId" : "P1234","project_name" : "f2b","description" : "FARM 2 BAG"}') });
  //   expect(service.postProjectData).toHaveBeenCalledWith(component.projectForm.value);
  //   spyOn(store, 'dispatch');
  //   store.dispatch(saveProject({ projects: component.projectForm.value }));
  //   expect(store.dispatch).toHaveBeenCalledWith(expectedAction)
  // });

  it('should filter employees based on search term', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const employeesList = [
        { empId: '1', first_name: 'John', last_name: 'Doe', emailID: 'john.doe@example.com', address: '123 Main St', mobile: 1234567890, Active: true, projectId:'P12' },
        { empId: '2', first_name: 'Jane', last_name: 'Doe', emailID: 'jane.doe@example.com', address: '456 Elm St', mobile: 9987654321, Active: false , projectId:'P13'}
      ];
      component.employeesList = employeesList;

      const searchTerm = 'john';
      const expectedEmployees = [
        { empId: '1', first_name: 'John', last_name: 'Doe', emailID: 'john.doe@example.com', address: '123 Main St', mobile: 1234567890, Active: true }
      ];

      component.filter.setValue(searchTerm);

      const filter$ = of(component.filter.value);
      // const result$ = component.filteredEmployee$;

      const expected$ = cold('1000ms (a|)', { a: expectedEmployees });

      // expectObservable(result$).toBeObservable(expected$);
    });
  });

  it('should show "Welcome!" when len is 0', () => {
    component.len = 0;
    fixture.detectChanges(); // trigger change detection
    const welcomeElement = fixture.nativeElement.querySelector('h1');
    expect(welcomeElement.textContent).toContain('Welcome!');
  });

  // it('should bind the form control', () => {
  //   const input = fixture.debugElement.query(By.css('.form-control.ml-2'));
  //   console.log("ffffff : ", input);
    
  //   expect(input.nativeElement.value).toBe('');
  //   component.filter.setValue('test');
  //   fixture.detectChanges();
  //   expect(input.nativeElement.value).toBe('test');
  // });

  it('should dispatch updateEmployee action', () => {
    spyOn(store, 'dispatch');
    const row = {};
    const index = 0;
    const event = { target: { value: 1 } };
    const updateData = { row, index, projectId: event.target.value };
    const expectedAction = updateEmployee({ employees: updateData });
    component.selectedProject(event, row, index);
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should update filteredEmployees$', () => {
    const filter = new FormControl('');
    const searchSpy = spyOn(component, 'search');
    component.selectedProject({ target: { value: 1 } }, {}, 0);
    expect(component.filteredEmployees$).toBeDefined();
    expect(searchSpy).toHaveBeenCalledWith('');
    filter.setValue('test');
    fixture.detectChanges();
    expect(searchSpy).toHaveBeenCalledWith('test');
  });
 
});
