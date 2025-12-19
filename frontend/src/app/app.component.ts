import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './_component/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import {AuthService} from './_auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected readonly title = signal('LOL Item Generator');

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // 🔥 AUTH BOOTSTRAP
    if (this.authService.isLoggedIn()) {
      this.authService.loadCurrentUser();
    }
  }
}
