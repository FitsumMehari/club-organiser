import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SendProposalComponent } from './pages/send-proposal/send-proposal.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestToJoinClubComponent } from './pages/request-to-join-club/request-to-join-club.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyOTPComponent } from './pages/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RequestToJoinEventComponent } from './pages/request-to-join-event/request-to-join-event.component';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full" },
  {path: "home", component: AppComponent },
  {path: "clubs", component: AppComponent },
  {path: "events", component: AppComponent },
  {path: "contact", component: ContactComponent },
  {path: "join-club/:clubID", component: RequestToJoinClubComponent },
  {path: "reserve-ticket/:eventID", component: RequestToJoinEventComponent },
  {path: "send-proposal", component: SendProposalComponent },
  {path: "login", component: LoginComponent },
  {path: "forgot-password", component: ForgotPasswordComponent },
  {path: "verify-otp", component: VerifyOTPComponent },
  {path: "reset-password", component: ResetPasswordComponent },
  {path: "user", component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
