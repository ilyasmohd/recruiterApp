import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// import { AppRoutingModule } from './app-rozuting.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ServiceComponent } from './service/service.component';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, 
  MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule
   } from '@angular/material';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component';
import { EthicsComponent } from './ethics/ethics.component';
import { MissionVisionComponent } from './mission-vision/mission-vision.component';
import { EsteemedClientsComponent } from './esteemed-clients/esteemed-clients.component';
import { ProjectExportsComponent } from './project-exports/project-exports.component';
import { IndustriesComponent } from './industries/industries.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EmployerComponent } from './employer/employer.component';
import { CurrentOpeningComponent } from './current-opening/current-opening.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { OverseasComponent } from './overseas/overseas.component';
import { DomesticComponent } from './domestic/domestic.component';
import { SellingComponent } from './selling/selling.component';
import { RecruitemntComponent } from './recruitemnt/recruitemnt.component';

const appRoutes: Routes = [    // define this before @NgModule 
  { path: 'home', component: HomeComponent },
  { path: 'jobseeker', component: JobSeekerComponent },
  { path: 'openings', component: CurrentOpeningComponent },
  { path: 'employer', component: EmployerComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'industries', component: IndustriesComponent },
  { path: 'projectexports', component: ProjectExportsComponent },
  { path: 'clients', component: EsteemedClientsComponent },
  { path: 'mission-vision', component: MissionVisionComponent },
  { path: 'ethics', component: EthicsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'overseas', component: OverseasComponent },
  { path: 'domestic', component: DomesticComponent },
  { path: 'selling', component: SellingComponent },
  { path: 'recruitemnt', component: RecruitemntComponent },
  { path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
  { path: '**', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JobSeekerComponent,
    ServiceComponent,
    HomeComponent,
    EthicsComponent,
    MissionVisionComponent,
    EsteemedClientsComponent,
    ProjectExportsComponent,
    IndustriesComponent,
    ContactusComponent,
    EmployerComponent,
    CurrentOpeningComponent,
    FeedbackComponent,
    OverseasComponent,
    DomesticComponent,
    SellingComponent,
    RecruitemntComponent,
  ],
  imports: [
    BrowserModule,RouterModule,MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, 
    MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule,BrowserAnimationsModule,
    AngularFontAwesomeModule,ReactiveFormsModule,FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
