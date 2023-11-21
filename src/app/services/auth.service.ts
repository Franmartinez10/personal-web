import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';



@Injectable({
  providedIn: 'root'
})



export class AuthService {

  constructor(private http: HttpClient) {
  }
    
  async login(email:string, password:string ) {
    return axios.post('http://45.147.251.201:1337/api/auth/local', JSON.stringify({
      identifier: email,
      password: password,
    }), {
      headers: {
        'Content-Type': 'application/json',
        // You may need to include other headers like Authorization if required
      }
    })
      
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  


  
}
