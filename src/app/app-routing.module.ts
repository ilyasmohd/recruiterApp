import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { ServiceComponent } from './service/service.component';
import { AppComponent } from './app.component';


// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      { path: "", redirectTo: "/jobseeker", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "/jobseeker", component: JobSeekerComponent },
      { path: "/service", component: ServiceComponent }
    ]
  }]
  export const AppRoutingModule = RouterModule.forChild(routes);