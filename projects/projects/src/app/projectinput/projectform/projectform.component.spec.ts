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
import { of } from 'rxjs';

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

  const proj = {
    "projectId": "P1234",
    "project_name": "f2b",
    "description": "FARM 2 BAG",
  };
  let http: HttpClient
  let SERVER_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/project/save';
  let service: DatastoreService;
  let httpMock: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectformComponent],
      imports: [StoreModule.forRoot(
        { projects: projectReducer },
        {}),
        HttpClientModule, FormsModule, ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [HttpClient, DatastoreService]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ProjectformComponent);
        httpMock = TestBed.inject(HttpTestingController);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ProjectformComponent);
    service = TestBed.inject(DatastoreService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
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
    expect(project_name.hasError('required')).toBeTruthy();
  });


  it('should call onSubmit method', () => {
    spyOn(component, 'onSubmit');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('Save the project form Input', () => {
    const expectedAction = saveProject({ projects: proj });
    spyOn(store, 'dispatch');
    store.dispatch(saveProject({ projects: proj }));
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call onReset method', () => {
    spyOn(component, 'onReset');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.projectForm.value).toEqual({
      "projectId": "",
      "project_name": "",
      "description": ""
    });
  });

  it('should reset the form when submit button is clicked', () => {
    component.projectForm.setValue({
      "projectId": "P1234",
      "project_name": "f2b",
      "description": "FARM 2 BAG",
    });
    const resetButton = fixture.nativeElement.querySelector('button[type="reset"]');
    resetButton.click();
    expect(component.projectForm.value).toEqual({
      "projectId": null,
      "project_name": null,
      "description": null
    });
  });

  it('should save project data via post', () => {
    spyOn(service, 'postProjectData').and.returnValue(of({
      "projectId": "P1234",
      "project_name": "f2b",
      "description": "FARM 2 BAG",
    }));
    component.projectForm.setValue({
      projectId: "P1234",
      project_name: "f2b",
      description: "FARM 2 BAG",
    });
    component.onSubmit();
    // const expectedAction = saveProject({ projects: JSON.parse('{"projectId" : "P1234","project_name" : "f2b","description" : "FARM 2 BAG"}') });
    const expectedAction = saveProject({ projects: {"projectId" : "P1234","project_name" : "f2b","description" : "FARM 2 BAG"} });
   
    expect(service.postProjectData).toHaveBeenCalledWith(component.projectForm.value);
    spyOn(store, 'dispatch');
    store.dispatch(saveProject({ projects: component.projectForm.value }));
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction)
  });

  it('should generate alert if form is invalid', () => {
    component.projectForm.setValue({
      "projectId": "",
      "project_name": "f2b",
      "description": "FARM 2 BAG",
    });
    console.log("cccvv : ", component.projectForm.valid);
    expect(component.projectForm.valid).toBeFalsy();

    spyOn(store, 'dispatch');
    expect(store.dispatch).not.toHaveBeenCalled();
    spyOn(window, 'alert');
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    button.click();
    expect(window.alert).toHaveBeenCalledWith('Please file the form with correct details');
  });
});


