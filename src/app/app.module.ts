import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {
  MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component';
import { EthicsComponent } from './ethics/ethics.component';
import { MissionVisionComponent } from './mission-vision/mission-vision.component';
import { EsteemedClientsComponent } from './esteemed-clients/esteemed-clients.component';
import { IndustriesServedComponent } from './industries-served/industries.component';
import { ContactusComponent } from './contact-us/contactus.component';
import { EmployerComponent } from './employer/employer.component';
import { CurrentOpeningComponent } from './current-opening/current-opening.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { JobseekerService } from './ApiService/jobseeker.service';
import { StatusService } from './ApiService/status.service';
import { MiscellaneousService } from './ApiService/miscellaneous.service'
import { CurrentOpeningsService } from './ApiService/current-openings.service';
import { DatePipe } from '@angular/common';
import { TrackStatusComponent } from './track-status/track-status.component';
import { RecruitementProcessFlowComponent } from './recruitement-process-flow/recruitement-process-flow.component';
import { OtherServicesComponent } from './other-services/other-services.component';
import { UniqueSellingPropositionComponent } from './unique-selling-proposition/unique-selling-proposition.component';
import { AboutUsComponent } from './about-us/about-us.component';

const appRoutes: Routes = [    // define this before @NgModule 
  { path: 'home', component: HomeComponent },
  { path: 'mission-vision', component: MissionVisionComponent },
  { path: 'recruitement-process-flow', component: RecruitementProcessFlowComponent },
  { path: 'sellingProposition', component: UniqueSellingPropositionComponent },
  { path: 'ethics', component: EthicsComponent },
  { path: 'ourclients', component: EsteemedClientsComponent },
  { path: 'industriesServed', component: IndustriesServedComponent },
  { path: 'openings', component: CurrentOpeningComponent },
  { path: 'otherServices', component: OtherServicesComponent },
  { path: 'status', component: TrackStatusComponent },
  { path: 'employer', component: EmployerComponent },
  { path: 'jobseeker', component: JobSeekerComponent },
  { path: 'jobseeker/:profession', component: JobSeekerComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JobSeekerComponent,
    HomeComponent,
    EthicsComponent,
    MissionVisionComponent,
    EsteemedClientsComponent,
    IndustriesServedComponent,
    ContactusComponent,
    EmployerComponent,
    CurrentOpeningComponent,
    FeedbackComponent,
    TrackStatusComponent,
    OtherServicesComponent,
    UniqueSellingPropositionComponent,
    AboutUsComponent,
    RecruitementProcessFlowComponent
  ],
  imports: [
    HttpClientModule, BrowserModule, RouterModule, MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, BrowserAnimationsModule,
    AngularFontAwesomeModule, ReactiveFormsModule, FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [JobseekerService, CurrentOpeningsService, StatusService, MiscellaneousService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
