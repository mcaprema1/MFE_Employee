import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { projectReducer } from 'datastore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import {routes } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ProjectinputModule } from './projectinput/projectinput.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ProjectinputModule,
    StoreModule.forRoot(
      { projects: projectReducer },
      {}),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        // logOnly: environment.production,
       } ),
       RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
