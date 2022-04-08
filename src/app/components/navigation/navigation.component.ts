import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public userExists: boolean = false;

  constructor(private _auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.userExists = this._auth.loggedIn()
  }

  signOut() {
    this._auth.logOut()
    location.reload()
  }

  deleteAccount() {
    if(confirm('Are you sure you would like to delete your account?')){
      this._auth.getId().subscribe({
        next: (res:any) => this._auth.delete(res.value).subscribe({
          complete: () => this._auth.logOut(),
          error: (e) => console.log(e)
        })
      })
    }
  }

  navi(page: string){
    let closeNav = document.getElementById('nav-toggle')
    if(closeNav) {
      closeNav.click();
    }
    this.router.navigate([page])
  }

  loginModalOpen(){
    let loginModalOpen = document.getElementById('login-open')
    if(loginModalOpen){
      loginModalOpen.click()
    }
  }

  registerModalOpen(){
    let registerModalOpen = document.getElementById('register-open')
    if(registerModalOpen){
      registerModalOpen.click()
    }
  }
}
