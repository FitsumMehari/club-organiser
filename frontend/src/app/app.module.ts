import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SendProposalComponent } from './pages/send-proposal/send-proposal.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestToJoinClubComponent } from './pages/request-to-join-club/request-to-join-club.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RequestToJoinEventComponent } from './pages/request-to-join-event/request-to-join-event.component';
import { HomeComponent } from './pages/home/home.component';
import { ClubsComponent } from './pages/clubs/clubs.component';
import { EventsComponent } from './pages/events/events.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthorizedStatusComponent } from './pages/authorized-status/authorized-status.component';
import { AuthorizedOrganizersComponent } from './pages/authorized-organizers/authorized-organizers.component';
import { AuthorizedClubsComponent } from './pages/authorized-clubs/authorized-clubs.component';
import { AuthorizedEventsComponent } from './pages/authorized-events/authorized-events.component';
import { AuthorizedProposalsComponent } from './pages/authorized-proposals/authorized-proposals.component';
import { FilterPipe } from './filter.pipe';
import { AuthorizedAddEventComponent } from './pages/authorized-add-event/authorized-add-event.component';
import { AuthorizedAddEventDetailsComponent } from './pages/authorized-add-event-details/authorized-add-event-details.component';
import { AuthorizedManageClubComponent } from './pages/authorized-manage-club/authorized-manage-club.component';

@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FormComponent,
    ContactComponent,
    SendProposalComponent,
    LoginComponent,
    RequestToJoinClubComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RequestToJoinEventComponent,
    HomeComponent,
    ClubsComponent,
    EventsComponent,
    SidebarComponent,
    AuthorizedStatusComponent,
    AuthorizedOrganizersComponent,
    AuthorizedClubsComponent,
    AuthorizedEventsComponent,
    AuthorizedProposalsComponent,
    AuthorizedAddEventComponent,
    AuthorizedAddEventDetailsComponent,
    AuthorizedManageClubComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
