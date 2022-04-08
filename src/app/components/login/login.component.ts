import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {userId: null, password:null }

  constructor(private _auth: AuthService,
      private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    try{
      this._auth.login(this.user)
      .subscribe((res): any => {
        localStorage.setItem('token', res.value)
        var loginModal = document.getElementById('login-close');
        if(loginModal){
          loginModal.click()
        }
        location.reload()
      })
    }catch(err){
      console.log(err);
    }
  }
}
