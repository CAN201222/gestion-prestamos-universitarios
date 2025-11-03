import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

interface ValidationErrors {
  [key: string]: string[];
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registro.html',
  styleUrls: ['./registro.scss']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  loading = false;
  error: ValidationErrors | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipo_usuario: ['estudiante', Validators.required],
      first_name: [''],
      last_name: [''],
      matricula: [''],
      telefono: ['']
    });
  }

 get f(): { [key: string]: AbstractControl } {
    return this.registroForm.controls;
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = false;

    this.authService.register(this.registroForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (err: any) => {
          this.error = err.error;
          this.loading = false;
        }
      });
  }
}