import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { projectReducer } from 'datastore';

import { ProjectformComponent } from './projectform.component';

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
      ]
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
