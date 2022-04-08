import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dbUrl = "https://tworealitiesapi.azurewebsites.net/api/auth/";

  constructor(private http: HttpClient,
    private router: Router) { }

  login(user: any) {
    return this.http.post<any>(this.dbUrl + "login", user)
  }
  
  register(user:any) {
    return this.http.post<any>(this.dbUrl + "register", user)
  }

  loggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  logOut() {
    localStorage.removeItem('token')
    this.router.navigate(['/home'])
  }

  delete(id: string){
    return this.http.delete(this.dbUrl+id)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getId() {
    return this.http.get(this.dbUrl)
  }
  
}
