import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectformComponent } from './projectform.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { DatastoreService, projectReducer, saveProject, Project } from 'datastore';
import { AppState } from 'projects/datastore/src/lib/app.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';


describe('ProjectformComponent', () => {
  let component: ProjectformComponent;
  let fixture: ComponentFixture<ProjectformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectformComponent ],
      imports: [
        StoreModule.forRoot(
          { projects: projectReducer },
          {}), 
          HttpClientModule, FormsModule, ReactiveFormsModule
      ],
      providers : [DatastoreService, HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('ProjectformComponent', () => {
  let component: ProjectformComponent;
  let fixture: ComponentFixture<ProjectformComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  
  let store: Store<AppState>;
  interface ProjectState {
    allProjects: Project[];
  }
  
  const initialState: ProjectState = {
    allProjects: [],
  };
  
  const proj= {
    "projectId" : "P1234",
    "project_name" : "f2b",
    "description" : "FARM 2 BAG",
      };
  let http : HttpClient
  let SERVER_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/project/save';
  let service: DatastoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectformComponent ],
      imports: [StoreModule.forRoot(
        { projects: projectReducer },
        {}),
        HttpClientModule, FormsModule, ReactiveFormsModule
      ],
      providers :[HttpClient, DatastoreService]
    })
    .compileComponents().then(() =>{
      fixture = TestBed.createComponent(ProjectformComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ProjectformComponent);
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
    component.projectForm.controls.projectId.setValue('');
    component.projectForm.controls.project_name.setValue('');
    component.projectForm.controls.description.setValue('');
    expect(component.projectForm.valid).toBeFalsy();
  });

  // it('Test a form group elements count', () =>{
  //   const formelement= fixture.debugElement.nativeElement.querySelector('#projectForm');
  //   const inputElements = formelement.querySelectorAll('input');
  //   expect(inputElements.length).toEqual(3)
  // })

  it('Test Project Id field validity', () => {
    const projectId = component.projectForm.controls.projectId;
    expect(projectId.valid).toBeFalsy();
    projectId.setValue('');
    expect(projectId.hasError('required')).toBeTruthy();
  });

  it('Test Project Name field validity', () => {
    const project_name = component.projectForm.controls.project_name;
    expect(project_name.valid).toBeFalsy();
    project_name.setValue('');
    expect(project_name.hasError('required') ).toBeTruthy();
  });


  it('should call onSubmit method', () => {
    spyOn(component, 'onSubmit');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('Save the project form Input', () => {   
    const expectedAction = saveProject({projects: proj});
    spyOn(store, 'dispatch');
    store.dispatch(saveProject({projects: proj}));
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call onReset method', () => {
    spyOn(component, 'onReset');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.projectForm.value).toEqual({
      "projectId" : "",
      "project_name" : "",
      "description" : ""
    });
  });
});

describe('DatastoreService', () => {
  let service: DatastoreService;
  let httpMock: HttpTestingController;
  const proj= {
    "projectId" : "P1234",
    "project_name" : "f2b",
    "description" : "FARM2BAG",
   };
    let SERVER_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/project/save';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatastoreService]
    });

    service = TestBed.inject(DatastoreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should save data via POST', () => {

    service.postProjectData(proj).subscribe(data  => {
      console.log("ddd : ", data, JSON.stringify(proj));
      expect(data).toEqual(JSON.stringify(proj));
    });
    const req = httpMock.expectOne(SERVER_URL);
    expect(req.request.method).toBe('POST');
    expect(JSON.stringify(req.request.body)).toEqual(JSON.stringify(proj));
    req.flush(proj);
  });
});
