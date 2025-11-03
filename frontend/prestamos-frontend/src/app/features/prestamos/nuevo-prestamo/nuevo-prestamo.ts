import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ApiService, Libro } from '../../../core/services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevo-prestamo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './nuevo-prestamo.html',
  styleUrls: ['./nuevo-prestamo.scss']
})
export class NuevoPrestamoComponent implements OnInit {
  prestamoForm!: FormGroup;
  libros$!: Observable<Libro[]>;
  loading = false;
  error = '';
  success = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prestamoForm = this.fb.group({
      libro: [null, Validators.required],
      fecha_devolucion_prevista: ['', Validators.required]
    });

    this.libros$ = this.api.getLibros();
  }

  get f() { return this.prestamoForm.controls; }

  onSubmit() {
    if (this.prestamoForm.invalid) {
      this.prestamoForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = false;

    const rawData = this.prestamoForm.value;
    const date = new Date(rawData.fecha_devolucion_prevista);
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    const prestamoData = {
      libro: rawData.libro,
      fecha_devolucion_prevista: utcDate.toISOString()
    };

    this.api.crearPrestamo(prestamoData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          this.libros$ = this.api.getLibros(); 
          setTimeout(() => {
            this.router.navigate(['/prestamos']);
          }, 2000);
        },
        error: (err: any) => {
          this.error = err.error.libro ? err.error.libro[0] : (err.error.detail || 'Error al crear el préstamo.');
          this.loading = false;
        }
      });
  }
}