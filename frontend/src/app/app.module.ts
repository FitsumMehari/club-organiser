import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
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
    EventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
