import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  constructor(private authService: AuthService) {
  }

  user:any = {}

  ngOnInit(): void {
      this.authService._user.subscribe((next) => {
        this.user = next
      })
  }

  logout() {
    this.authService.logout()
  }
}
