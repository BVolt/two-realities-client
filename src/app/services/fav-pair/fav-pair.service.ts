import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavPairService {
  favPair = {}

  private dbUrl = "https://tworealitiesapi.azurewebsites.net/api/favpair"

  constructor(private http: HttpClient) { }

  getAllFavorites(){
    return this.http.get(this.dbUrl)
  }

  addFavorites(favPair: any){
    return this.http.post(this.dbUrl, favPair)
  }

  updateFavorites(favPair: any){
    return this.http.patch(this.dbUrl, favPair)
  }

  deleteFavorites(userId: string){
    return this.http.delete(this.dbUrl + `/${userId}`)
  }
}
