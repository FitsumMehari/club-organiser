import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full" },
  {path: "home", component: AppComponent },
  {path: "clubs", component: AppComponent },
  {path: "events", component: AppComponent },
  {path: "contact", component: AppComponent },
  {path: "register", component: AppComponent },
  {path: "login", component: AppComponent },
  {path: "user", component: AppComponent },
  {path: "forgot-password", component: AppComponent },
  {path: "verify-otp", component: AppComponent },
  {path: "reset-password", component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
