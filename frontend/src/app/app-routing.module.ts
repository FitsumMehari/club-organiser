import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
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
import { AuthGuardService } from './guards/route.guard';
import { AuthorizedStatusComponent } from './pages/authorized-status/authorized-status.component';
import { AuthorizedOrganizersComponent } from './pages/authorized-organizers/authorized-organizers.component';
import { AuthorizedClubsComponent } from './pages/authorized-clubs/authorized-clubs.component';
import { AuthorizedEventsComponent } from './pages/authorized-events/authorized-events.component';
import { AuthorizedProposalsComponent } from './pages/authorized-proposals/authorized-proposals.component';
import { AuthorizedAddEventComponent } from './pages/authorized-add-event/authorized-add-event.component';
import { AuthorizedAddEventDetailsComponent } from './pages/authorized-add-event-details/authorized-add-event-details.component';
import { AuthorizedManageClubComponent } from './pages/authorized-manage-club/authorized-manage-club.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'clubs', component: ClubsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'join-club/:clubID', component: RequestToJoinClubComponent },
  { path: 'reserve-ticket/:eventID', component: RequestToJoinEventComponent },
  { path: 'send-proposal', component: SendProposalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'user', component: LoginComponent, canActivate: [AuthGuardService] },
  {
    path: 'status',
    component: AuthorizedStatusComponent,
    outlet: 'authorized',
  },
  {
    path: 'organizers',
    component: AuthorizedOrganizersComponent,
    outlet: 'authorized',
  },
  { path: 'clubs', component: AuthorizedClubsComponent, outlet: 'authorized' },
  {
    path: 'events',
    component: AuthorizedEventsComponent,
    outlet: 'authorized',
  },
  {
    path: 'proposals',
    component: AuthorizedProposalsComponent,
    outlet: 'authorized',
  },
  {
    path: 'add-event',
    component: AuthorizedAddEventComponent,
    outlet: 'authorized',
  },
  {
    path: 'event-details/:eventId',
    component: AuthorizedAddEventDetailsComponent,
    outlet: 'authorized',
  },
  {
    path: 'manage-club',
    component: AuthorizedManageClubComponent,
    outlet: 'authorized',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class AppRoutingModule {}
