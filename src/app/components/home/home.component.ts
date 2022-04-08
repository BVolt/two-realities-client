import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FavPairService } from 'src/app/services/fav-pair/fav-pair.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public favoritesArray: any;
  public userExists: boolean = false;

  constructor(private favpairs: FavPairService,
    private auth:AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.userExists = this.auth.loggedIn();
    this.getAll()
  }

  getAll(){
    this.favpairs.getAllFavorites().subscribe({
      next: (favorites) => {
        this.favoritesArray = favorites
        if(this.userExists){
          this.auth.getId().subscribe({
            next: (res:any) => {
              this.favoritesArray.sort((x:any , y:any)=>{
                return x.userId == res.value ? -1 : y.userId == res.value ? 1: 0
              })
              console.log(this.favoritesArray)
            }
          })

        }
      
      }
    }); 
  }

  openLogIn(){
    var closeModal = document.getElementById('register-close')
    if(closeModal){
      closeModal.click()
    }
    var logOpen = document.getElementById('login-open')
    if(logOpen){
      logOpen.click()
    }
  }

  openRegister(){
    var loginModal = document.getElementById('login-close');
    if(loginModal){
      loginModal.click()
    }
    var regOpen = document.getElementById('register-open')
    if(regOpen){
      regOpen.click()
    }
  }

  goToFavorites(){
    this.router.navigate(['/favorites'])
  }


}
