import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  editorial: string;
  año_publicacion: number;
  stock: number;
  disponibles: number;
}
export interface crearLibro {
  titulo: string;
  autor: string;
  isbn: string;
  editorial: string;
  año_publicacion: number;
  stock: number;
  disponibles: number;
}

export interface Prestamo {
  id: number;
  usuario: number;
  libro: number;
  fecha_prestamo: string;
  fecha_devolucion_prevista: string;
  fecha_devolucion_real: string | null;
  estado: string;
  usuario_username?: string;
  libro_titulo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Libros
  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/libros/`);
  }

  crearLibro(libroData: {
    titulo: string;
    autor: string;
    isbn: string;
    editorial: string;
    año_publicacion: number;
    stock: number;
  }): Observable<Libro> {
    return this.http.post<Libro>(`${this.apiUrl}/libros/`, libroData);
  }

  // crear libro
  getCrearLibro(libroData: crearLibro): Observable<Libro> {
    return this.http.post<Libro>(`${this.apiUrl}/libros/`, libroData);
  }

  // Préstamos
  getPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/prestamos/`);
  }

  crearPrestamo(prestamoData: { libro: number, fecha_devolucion_prevista: string }): Observable<Prestamo> {
    return this.http.post<Prestamo>(`${this.apiUrl}/prestamos/`, prestamoData);
  }

  devolverPrestamo(id: number): Observable<Prestamo> {
    return this.http.patch<Prestamo>(`${this.apiUrl}/prestamos/${id}/`, { estado: 'devuelto' });
  }
}