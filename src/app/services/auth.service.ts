import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false; 
  private userId: string = "";  
  private username: string = "";  

  constructor() { }

  setLoggedIn(log: boolean) {
    this.isLoggedIn = log;
  }

  setUser(user_id: string, user_name: string) {
    this.userId = user_id;  
    this.username = user_name; 
    localStorage.setItem('userId', user_id); 
  }

  getUserId(): string {
    return localStorage.getItem('userId') || ""; 
  }

  getUsername(): string {
    return this.username;  
  }
  

  get isUserLoggedIn(): boolean {  
    return this.isLoggedIn;
  }


  logout() {
    this.isLoggedIn = false;
    this.userId="";
    this.username = "";
    localStorage.removeItem('userId');
  }
}
