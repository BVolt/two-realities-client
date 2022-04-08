import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = {
    userId: null,
    password: null
  }
  passwordCheck = null;
  passMatch:boolean = true;
  noId:boolean = false;
  nameTaken:boolean = false;


  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(){
    if(this.user.userId==null){
      this.noId = true;
      setTimeout(()=>{
        this.noId = false;
      },3000)
      return console.log("No Id Given")
    }
    if(this.user.password != this.passwordCheck){
      this.passMatch = false;
      setTimeout(()=>{
        this.passMatch = true;
      },3000)
      return console.log("passwords do not match")
    }
    try{
      this._auth.register(this.user).subscribe({
        next: ()=>{
          this._auth.login(this.user).subscribe(res =>{
                localStorage.setItem('token', res.value)
                location.reload()
          })
        },
        complete: ()=>{
          var closeModal = document.getElementById('register-close')
          if(closeModal){
            closeModal.click()
          }
          console.log("complete")
        },
        error: (e)=>{
          if(e.error="Not a valid user id"){
            this.noId = true;
            setTimeout(()=>{
              this.noId = false;
            },3000)
          }
          if(e.error === "User Name is taken."){
            this.nameTaken = true;
            setTimeout(()=>{
              this.nameTaken = false;
            },4000)
          }
          throw e.error
        }
      })
    }catch(error){

    }
  

  }

}
