import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const socRocAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('soc_roc_token');

  if (token) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};