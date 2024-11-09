import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false; 
  private userId: string = "";  
  private username: string = "";
  private followedIds: string[] = [];
  private followedUsers:Set<number>=new Set();
  
  
  constructor() {
    const followedUsers=localStorage.getItem('followeUsers');
    if(followedUsers){
      this.followedUsers=new Set<number>(JSON.parse(followedUsers));
    }
  }

  setLoggedIn(log: boolean) {
    this.isLoggedIn = log;
  }

  setUser(user_id: string, user_name: string, followed_ids: string[]) {
    // this.userId = String(user_id); 
    this.userId = user_id;  
    this.username = user_name; 
    this.followedIds = followed_ids;
    localStorage.setItem('userId', user_id); 
    localStorage.setItem('followedIds', JSON.stringify(followed_ids));
  }

  setFollowedIds(followed_ids: string[]) {
    this.followedIds = followed_ids;
    localStorage.setItem('followedIds', JSON.stringify(followed_ids));
}

  // Public getter for userId
  getUserId(): string {
    return this.userId; // Return the private userId
  }

  getUsername(): string {
    return this.username;  
  }

getFollowedIds(): string[] {
  const ids = localStorage.getItem('followedIds');
  return ids ? JSON.parse(ids) : []; 
}
  get isUserLoggedIn(): boolean {  
    return this.isLoggedIn;
  }

  isUserFollowed(userId:number):boolean{
    return this.followedUsers.has(userId);
  }

  followUser(userId:number):void{
    this.followedUsers.add(userId);
    localStorage.setItem(`followedUsers`,JSON.stringify(Array.from(this.followedUsers)));
  }
  unfollowUser(userId:number):void{
    this.followedUsers.delete(userId);
    localStorage.setItem(`followedUsers`,JSON.stringify(Array.from(this.followedUsers)));
  }

  logout() {
    this.isLoggedIn = false;
    this.userId = "";
    this.username = "";
    this.followedIds = [];
    localStorage.removeItem('userId');
    localStorage.removeItem('followedIds');
  }
}
