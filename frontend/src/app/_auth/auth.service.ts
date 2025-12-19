import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtKey = 'jwt';
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();

  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.startTokenTimer();
  }

  // Ellenőrzi, hogy van-e már JWT token localStorage-ban
  private hasToken(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  register(username: string, email: string, password: string) {
    return this.http.post<{ token: string }>('/api/auth/register', {
      username,
      email,
      password
    }).pipe(
      tap(res => {
        localStorage.setItem(this.jwtKey, res.token);
        this.loggedInSubject.next(true);
        this.loadCurrentUser();
        this.startTokenTimer();
      })
    );
  }

  // Bejelentkezés
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem(this.jwtKey, res.token);
          this.loggedInSubject.next(true);
          this.loadCurrentUser();
          this.startTokenTimer();
        })
      );
  }

  // Kijelentkezés
  logout(): void {
    localStorage.removeItem(this.jwtKey);
    this.loggedInSubject.next(false);
    this.usernameSubject.next(null);
  }

  // JWT token lekérése
  getToken(): string | null {
    return localStorage.getItem(this.jwtKey);
  }

  // Ellenőrzi, hogy be van-e jelentkezve
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Token lejárat ellenőrzése
  public isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      return Math.floor(Date.now() / 1000) > expiry;
    } catch (e) {
      return true; // hibás token = lejárt
    }
  }


  // Automatikus kijelentkezés a token lejáratakor
  private startTokenTimer() {
    const token = this.getToken();
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    const timeout = expiry - Date.now();

    if (timeout <= 0) {
      this.logout();
    } else {
      setTimeout(() => this.logout(), timeout);
    }
  }

  loadCurrentUser() {
    this.http.get<{ username: string }>('/api/auth/me')
      .subscribe({
        next: res => this.usernameSubject.next(res.username),
        error: () => this.logout()
      });
  }




}
