import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from './guards/route.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'club-organiser';
  constructor(private authGuard: AuthGuardService) {}
  isAuthorized: boolean = false
  ngOnInit(): void {
      this.isAuthorized = this.authGuard.canActivate()
  }
}
