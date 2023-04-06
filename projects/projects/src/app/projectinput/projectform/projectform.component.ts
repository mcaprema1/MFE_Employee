import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatastoreService, Project, saveProject } from 'datastore'

@Component({
  selector: 'app-projectform',
  templateUrl: './projectform.component.html',
  styleUrls: ['./projectform.component.scss']
})
export class ProjectformComponent {
  employees$!: Observable<Project[]>;
  projectForm: FormGroup | any;
  POSTMAN_PROJECT_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/project/save';

  constructor(private store: Store, private formBuilder: FormBuilder, private http: HttpClient,
    private dataservice: DatastoreService) {
    // this.employees$ = this.store.pipe(filteredEmloyeeSelector);
  }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      project_name: ['', Validators.required],
      description: [''],
    });
  }
  onSubmit() {
    if (this.projectForm.valid) {
      
      this.dataservice.postProjectData(this.projectForm.value).subscribe
        ((res) => {
          console.log("temp : ", res);
          let temp= JSON.parse(res)   
          this.store.dispatch(saveProject({ projects: temp}));
          this.projectForm.reset()
        })
    } else {
      alert("Please file the form with correct details")
    }
  }
  onReset() {
    this.projectForm.reset();
  }

}
