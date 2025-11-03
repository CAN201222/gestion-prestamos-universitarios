import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro, ApiService } from '../../../core/services/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-libros',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './lista-libros.html',
  styleUrls: ['./lista-libros.scss']
})
export class ListaLibrosComponent implements OnInit {
  libros$!: Observable<Libro[]>;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.libros$ = this.api.getLibros();
  }
}