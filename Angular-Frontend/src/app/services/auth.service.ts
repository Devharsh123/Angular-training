import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginData, UserData } from './auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user: UserData) {
    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    })
    return this.http.post(`${environment.url}/register`, user, { headers: headers })
  }

  loginUser(user: LoginData) {
    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    })
    return this.http.post(`${environment.url}/login`, user, { headers: headers })
  }

  storeUserData(token: string, userId: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
  }

  loadUserToken() {
    let token = localStorage.getItem('token')
    let user = localStorage.getItem('userId')
    if (token && user) {
      return { token, user }
    }
    return null
  }

  logout() {
    localStorage.clear()
  }
}
