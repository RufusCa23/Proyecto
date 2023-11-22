import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  apiBaseUrl = 'http://localhost:3000';

  Register(inputData: any) {
    return this.http.post(this.apiBaseUrl + '/auth', inputData);
  }

  UpdateUser(inputData: any) {
    return this.http.put(this.apiBaseUrl + '/auth', inputData);
  }

  Login(inputData: any) {
    return this.http.post(this.apiBaseUrl + '/auth/login', inputData);
  }

  IsLogged() {
    return sessionStorage.getItem('user') != null;
  }

  GetLoggedUser() {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  GetToken() {
    return sessionStorage.getItem('token') != null
      ? sessionStorage.getItem('token')
      : '';
  }

  Logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
