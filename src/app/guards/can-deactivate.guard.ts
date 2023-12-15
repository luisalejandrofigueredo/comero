import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { inject } from '@angular/core';
export const canDeactivateGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService)
  const router=inject(Router)
  if (authService.isLoggedIn===false){
    return true;
  }
  router.navigate(['']);
  return false
};
