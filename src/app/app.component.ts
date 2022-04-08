import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'clientApp';
  userExists: boolean = false;
  constructor(private auth: AuthService){}

  ngOnInit(): void {
      this.userExists = this.auth.loggedIn();
  }


}
