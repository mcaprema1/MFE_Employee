import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ProjectformComponent } from '../projectinput/projectform/projectform.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      // imports: [ RouterTestingModule.withRoutes([
      //   { path: 'projectform', component: ProjectformComponent }
      // ])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should navigate to AboutPageComponent when button is clicked', () => {
  //   const button = fixture.nativeElement.querySelector('a');
  //   button.click();
  //   fixture.detectChanges();
  //   expect(router.url).toBe('/');
  // });

});
