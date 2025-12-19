import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../_auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDark=false;
  loggedIn = false;
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {

    this.authService.loggedIn$.subscribe(v => this.loggedIn = v);
    this.authService.username$.subscribe(u => this.username = u);

    if (this.authService.isLoggedIn()) {
      this.authService.loadCurrentUser();
    }

    const saved = localStorage.getItem('theme');
    this.isDark = saved === 'dark';
    this.applyTheme();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    this.applyTheme();
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  applyTheme() {
    document.documentElement.setAttribute('data-bs-theme', this.isDark ? 'dark' : 'light');
  }
}
