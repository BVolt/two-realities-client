import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FavPairService } from 'src/app/services/fav-pair/fav-pair.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  favPair = {
    userId: '',
    titleOne: '',
    yearOne: null,
    titleTwo: '',
    yearTwo: null
  }
  firstPair: boolean = true;

  constructor(private favPairs: FavPairService,
      private auth: AuthService,
      private router: Router) { }

  ngOnInit(): void {
    //Set UserId for the form
    this.auth.getId().subscribe((res:any)=>{
      this.favPair.userId = res.value
    })
    
    //Check if the user already has pair and input form values accordingly
    this.favPairs.getAllFavorites().subscribe(res=>{
      let favoritesArray:any = res
      let checkExist = favoritesArray.find((pair:any)=> pair.userId == this.favPair.userId)
      if(checkExist){
        this.favPair.titleOne = checkExist.titleOne;
        this.favPair.yearOne = checkExist.yearOne;
        this.favPair.titleTwo = checkExist.titleTwo;
        this.favPair.yearTwo = checkExist.yearTwo;
        this.firstPair = false;
      }
    })
  }

  addFav(){
    const removedSpaces = this.favPair.titleOne.replace(/\s/g,'')
    if(removedSpaces=== ''){
      return 
    }
    var favPair = {
      userId: this.favPair.userId,
      titleOne: this.favPair.titleOne,
      yearOne: this.favPair.yearOne,
      titleTwo: this.favPair.titleTwo,
      yearTwo: this.favPair.yearTwo
    }
    return this.favPairs.addFavorites(favPair).subscribe({
      next: () => {},
      complete: () => this.router.navigate(['/home']),
      error: (e) => console.log(e)
    })
  }

  updateFav(){
    const removedSpaces = this.favPair.titleOne.replace(/\s/g,'')
    if(removedSpaces=== ''){
      return 
    }
    var favPair = {
      userId: this.favPair.userId,
      titleOne: this.favPair.titleOne,
      yearOne: this.favPair.yearOne,
      titleTwo: this.favPair.titleTwo,
      yearTwo: this.favPair.yearTwo
    }
    return this.favPairs.updateFavorites(favPair).subscribe({
      next: (res) => {console.log(res)},
      complete: () => this.router.navigate(['/home']),
      error: (e) => console.log(e)
    })
  }

  deleteFav(){
    if(confirm("Are you sure you want to clear your favorite games?")){
      this.favPairs.deleteFavorites(this.favPair.userId).subscribe({
        complete: () => this.router.navigate(['/home'])
      })
    }
  }
}
