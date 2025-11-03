import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { loginGuard } from './core/guards/login-guard';

export const routes: Routes = [
  // Redirección principal
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Rutas de Autenticación
  { 
    path: 'auth/login', 
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },
  { 
    path: 'auth/registro', 
    loadComponent: () => import('./features/auth/registro/registro').then(m => m.RegistroComponent),
    canActivate: [loginGuard]
  },

  // Rutas Protegidas
  { 
    path: 'dashboard', 
    loadComponent: () => import('./features/usuarios/dashboard/dashboard').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'libros', 
    loadComponent: () => import('./features/libros/lista-libros/lista-libros').then(m => m.ListaLibrosComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'libros/nuevo',
    loadComponent: () => import('./features/libros/nuevo-libro/nuevo-libro').then(m => m.NuevoLibroComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'prestamos', 
    loadComponent: () => import('./features/prestamos/lista-prestamos/lista-prestamos').then(m => m.ListaPrestamosComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'prestamos/nuevo', 
    loadComponent: () => import('./features/prestamos/nuevo-prestamo/nuevo-prestamo').then(m => m.NuevoPrestamoComponent),
    canActivate: [authGuard]
  },

  // Ruta comodín (Wildcard)
  { path: '**', redirectTo: 'dashboard' }
];