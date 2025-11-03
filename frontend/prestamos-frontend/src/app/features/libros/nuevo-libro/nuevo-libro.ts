import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-nuevo-libro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nuevo-libro.html',
  styleUrls: ['./nuevo-libro.scss']
})
export class NuevoLibroComponent {
  form: FormGroup;
  loading = false;
  error = '';
  success = false;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      isbn: ['', Validators.required],
      editorial: ['', Validators.required],
      año_publicacion: [new Date().getFullYear(), [Validators.required, Validators.min(1000)]],
      stock: [1, [Validators.required, Validators.min(1)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';
    this.api.crearLibro(this.form.value)
      .pipe(first())
      .subscribe({
        next: (libro) => {
          this.success = true;
          this.loading = false;
          // Opcional: redirigir a lista de libros
          this.router.navigate(['/libros']);
        },
        error: (err) => {
          this.error = err?.error || 'Error al crear el libro';
          this.loading = false;
        }
      });
  }
}