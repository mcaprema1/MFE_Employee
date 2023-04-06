import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DatastoreService, employeesReducer, projectReducer} from 'datastore';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(
      { employees: employeesReducer,  projects : projectReducer },
      {}),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        // logOnly: environment.production,
       } )
  ],
  providers: [DatastoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
