import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ProjectinputRoutingModule } from './projectinput-routing.module';
import { ProjectformComponent } from './projectform/projectform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { ProjectinputRoutingModule, routes } from './projectinput-routing.module';

@NgModule({
  declarations: [
    ProjectformComponent
  ],
  imports: [
    CommonModule, 
    ProjectinputRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectinputModule { }
