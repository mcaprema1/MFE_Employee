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
  submitted = false;
  POSTMAN_PROJECT_URL = 'https://09a89f92-edc2-46ae-8b50-65bf2d58fab9.mock.pstmn.io/project/save';

  constructor(private store: Store, private formBuilder: FormBuilder, private http: HttpClient) {
    // this.employees$ = this.store.pipe(filteredEmloyeeSelector);
  }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      project_name: ['', Validators.required],
      description: [''],
    });
  }

  get f() { return this.projectForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.projectForm.invalid) {
      return;
    }
    const requestOptions: Object = {
      responseType: 'text',
      'Content-Type': 'application/json'
    }
    this.http.post<any>(this.POSTMAN_PROJECT_URL, this.projectForm.value, requestOptions).subscribe
      ({
        next: (res) => {
          console.log("res  project : ", res);
          let temp = JSON.parse(res)
          this.store.dispatch(saveProject({ projects: temp }));
        },
        error: (err) => console.log("err : ", err)
      })
  }
  onReset() {
    this.submitted = false;
    this.projectForm.reset();
  }

}
