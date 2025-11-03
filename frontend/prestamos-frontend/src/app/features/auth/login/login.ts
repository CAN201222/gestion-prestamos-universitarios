import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username, password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          this.error = err.error['detail'] || 'Credenciales inválidas.';
          this.loading = false;
        }
      });
  }
}