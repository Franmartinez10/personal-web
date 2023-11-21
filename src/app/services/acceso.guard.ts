import { Token } from '@angular/compiler';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';



export const accesoGuard: CanActivateFn = (route, state) => {

 if( localStorage.getItem('token')){
   return true
 }else{
  const router = new Router();
  router.navigate(['/login']);
  return false
 } 
};
