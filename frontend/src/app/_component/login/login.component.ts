import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  mode: 'login' | 'register' = 'login';

  loginForm: FormGroup;
  registerForm: FormGroup;

  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }


  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.http.post<{ token: string }>('/api/auth/login', this.loginForm.value)
      .subscribe({
        next: (res) => {
          localStorage.setItem('jwt', res.token);
          this.error = null;
          this.router.navigate(['/']);
        },
        error: () => {
          this.error = 'Hibás felhasználónév vagy jelszó';
        }
      });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;

    this.http.post('/api/auth/register', this.registerForm.value)
      .subscribe({
        next: () => {
          this.error = null;
          alert('Sikeres regisztráció! Most már bejelentkezhetsz.');

          this.mode = 'login';
          this.registerForm.reset();
        },
        error: () => {
          this.error = 'A felhasználó már létezik, vagy hibás adatok.';
        }
      });
  }


}
