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
const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full" },
  {path: "home", component: HomeComponent },
  {path: "clubs", component: ClubsComponent },
  {path: "events", component: EventsComponent },
  {path: "contact", component: ContactComponent},
  {path: "join-club/:clubID", component: RequestToJoinClubComponent },
  {path: "reserve-ticket/:eventID", component: RequestToJoinEventComponent },
  {path: "send-proposal", component: SendProposalComponent },
  {path: "login", component: LoginComponent },
  {path: "forgot-password", component: ForgotPasswordComponent },
  {path: "reset-password", component: ResetPasswordComponent },
  {path: "user", component: LoginComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
