import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BookingComponent } from './booking/booking.component';
import { SearchFormComponent } from './booking/search-form/search-form.component';
import { SearchResultsComponent } from './booking/search-results/search-results.component';
import { AuthGuard } from './_guard/auth-guard';
import {BookingSchedulerComponent} from './booking-scheduler/booking-scheduler.component'
//import {BookingSchedulerComponentCopy} from './booking-scheduler-copy/booking-scheduler-copy.component'
//import { BookingSchedulerComponentUpdate } from './booking-scheduler-update/booking-scheduler-update.component';

/* const routes: Routes = [
  {path:"",component: LoginComponent},
  //{path:"**",component: LoginComponent},
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},
  {path:"booking",component: BookingComponent, canActivate: [AuthGuard]},
  {path:"search-form",component: SearchFormComponent, canActivate: [AuthGuard]},
  {path:"search-result",component: SearchResultsComponent, canActivate: [AuthGuard]}
]; */

const routes: Routes = [
  //{path:"",component: LoginComponent},
  //{path:"**",component: LoginComponent},
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},
  //{path:"booking",component: BookingComponent, canActivate: [AuthGuard]},
  {path:"booking",component: BookingComponent},
  //{path:"search-form",component: SearchFormComponent, canActivate: [AuthGuard]},
  {path:"search-form",component: SearchFormComponent},
  //{path:"search-result",component: SearchResultsComponent, canActivate: [AuthGuard]},
  {path:"search-result",component: SearchResultsComponent},
  {path:"booking-scheduler",component: BookingSchedulerComponent},
  //{path:"booking-scheduler-copy",component: BookingSchedulerComponentCopy},
  //{path:"booking-scheduler-update",component: BookingSchedulerComponentUpdate},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
