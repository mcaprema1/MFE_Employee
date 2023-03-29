import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeModule } from './employee/employee.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTES} from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { employeesReducer } from 'datastore';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    EmployeeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(
      { employees: employeesReducer },
      {}),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        // logOnly: environment.production,
       } ),
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
