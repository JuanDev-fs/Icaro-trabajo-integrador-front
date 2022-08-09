import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  private URL:string='http://localhost:3000/api/users'


  constructor(private http:HttpClient) { }
}
