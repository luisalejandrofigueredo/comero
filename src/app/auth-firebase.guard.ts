import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./services/auth.service";
@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseGuard implements CanActivate {
  private authService=inject(AuthService);
  private router=inject(Router);
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
     return new Promise<boolean>(async (resolve, reject) => {
      if (this.authService.isLoggedIn !== true) {
        await this.router.navigate(['']).then(()=>{resolve(false)});
      }
       resolve(true);     
    }) 
  }
  
}
