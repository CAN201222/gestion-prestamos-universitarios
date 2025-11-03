import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth'; // Importa desde 'auth'

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUserValue) {
    // Ya logueado, redirige al dashboard
    router.navigate(['/dashboard']);
    return false;
  }

  // No logueado, permite ver el login/registro
  return true;
};