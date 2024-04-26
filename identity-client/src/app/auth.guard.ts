import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

var tokenKey = 'token';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
}

export const loginGuard: CanActivateFn = (route, state) => {
  console.log('route keldi');
  console.log(route);

  console.log('state keldi');
  console.log(state); 

  return true;
};

export const usersGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

 if(localStorage.getItem(tokenKey) != "") {
    return true;
 }
  
  console.log('navigate boldi');
  router.navigate(['/login'])
  return false;
};

export const studentProfileGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

 if(localStorage.getItem(tokenKey) != "") {
    console.log('keldi');
    return true;
 }
  
  console.log('navigate boldi');
  router.navigate(['/login'])
  return false;
};
