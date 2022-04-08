import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService,
              private _router: Router){}

  canActivate(): boolean{
    if(this._auth.loggedIn()){
      return true;
    }else{
      this._router.navigate(['/home'])
      let loginModalOpen = document.getElementById('login-open')
      if(loginModalOpen){
        loginModalOpen.click()
      }
      return false;
    }
  }
  
}
