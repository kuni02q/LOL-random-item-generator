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

  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;

    this.http.post<{ token: string }>('/api/auth/login', credentials).subscribe({
      next: (res) => {
        localStorage.setItem('jwt', res.token); // JWT tárolása
        this.error = null;
        this.router.navigate(['/']); // sikeres login után redirect
      },
      error: (err) => {
        this.error = 'Hibás felhasználónév vagy jelszó';
        console.error(err);
      }
    });
  }
}
