import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectformComponent } from './projectform/projectform.component';

export const routes: Routes = [
  {
    path: 'projectform',
    component: ProjectformComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectinputRoutingModule { }
