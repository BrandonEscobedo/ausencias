import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const autenticadoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    authService.setRedirectUrl(state.url);
    router.navigate(['/login']);
    return false;
  }

  // Si la ruta define roles permitidos, verifica
  const expectedRoles = route.data?.['roles'] as string[] | undefined;

  if (expectedRoles && expectedRoles.length > 0) {
    const userRole = authService.getRole();
    if (!userRole || !expectedRoles.includes(userRole)) {
      router.navigate(['/dashboard']); // o a una ruta de acceso denegado
      return false;
    }
  }

  return true;
};
