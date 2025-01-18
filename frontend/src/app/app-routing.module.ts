import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SendProposalComponent } from './pages/send-proposal/send-proposal.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full" },
  {path: "home", component: AppComponent },
  {path: "clubs", component: AppComponent },
  {path: "events", component: AppComponent },
  {path: "contact", component: ContactComponent },
  {path: "join-club", component: AppComponent },
  {path: "reserve-ticket", component: AppComponent },
  {path: "send-proposal", component: SendProposalComponent },
  {path: "login", component: LoginComponent },
  {path: "forgot-password", component: AppComponent },
  {path: "verify-otp", component: AppComponent },
  {path: "reset-password", component: AppComponent },
  {path: "user", component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
