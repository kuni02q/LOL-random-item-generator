import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../_auth/auth.service';

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
    private authService: AuthService,
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

    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    ).subscribe({
      next: () => {
        this.error = null;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.error = 'Hibás felhasználónév vagy jelszó';
      }
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;

    this.authService.register(
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password
    ).subscribe({
      next: () => {
        this.error = null;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.error = 'A felhasználó már létezik, vagy hibás adatok.';
      }
    });
  }



}
