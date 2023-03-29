import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },

  // Your route here:

  {
    path: 'employee',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'employees',
        exposedModule: './Module',
      }).then((m) => m.EmployeeModule),
  },
  {
    path: 'project',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'projects',
        exposedModule: './Module',
      }).then((m) => m.ProjectinputModule),
  },
  // {
  //   path: 'react',
  //   component: WebComponentWrapper,
  //   data: {
  //     type: 'script',
  //     remoteEntry:
  //       'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
  //     remoteName: 'react',
  //     exposedModule: './web-components',
  //     elementName: 'react-element',
  //   } as WebComponentWrapperOptions,
  // },

  // {
  //   path: '**',
  //   component: NotFoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
