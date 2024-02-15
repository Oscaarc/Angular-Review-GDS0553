import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:3000";

  constructor(private http : HttpClient) { }

  registerUser(usuario : User) {
    return this.http.post(`${this.baseUrl}/users`, usuario);
  }

  getUserbyEmail(correo : string) : Observable <User[]> {
    let ema = this.http.get<User[]>(`${this.baseUrl}/users?email=${correo}`);
    return ema
  }
}
