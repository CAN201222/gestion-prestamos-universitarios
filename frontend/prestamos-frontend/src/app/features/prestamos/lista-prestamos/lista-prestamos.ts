import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Prestamo, ApiService } from '../../../core/services/api';
import { CommonModule, TitleCasePipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-prestamos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TitleCasePipe, // <-- Necesario para el pipe | titlecase
    DatePipe       // <-- Necesario para el pipe | date
  ],
  templateUrl: './lista-prestamos.html',
  styleUrls: ['./lista-prestamos.scss']
})
export class ListaPrestamosComponent implements OnInit {
  prestamos$!: Observable<Prestamo[]>;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.prestamos$ = this.api.getPrestamos();
  }

  onDevolver(id: number) {
    if (confirm('¿Estás seguro de que quieres devolver este libro?')) {
      this.api.devolverPrestamo(id).pipe(
        tap(() => {
          this.cargarPrestamos();
        })
      ).subscribe();
    }
  }
}