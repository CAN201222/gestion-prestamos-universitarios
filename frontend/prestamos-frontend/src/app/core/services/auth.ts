import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  username: string;
  email: string;
  tipo_usuario: string;
  matricula: string;
  telefono: string;
  first_name: string;
  last_name: string;
  is_staff?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/usuarios/login/`, { username, password })
      .pipe(map(response => {
        if (response.user && response.access) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.access);
          this.currentUserSubject.next(response.user);
        }
        return response;
      }));
  }

  register(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/usuarios/registro/`, userData);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}