import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost/dbapp_api/';

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'blogSignup.php', user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'blogLogin.php', user);
  }
  getPostById(id: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'getPostById.php', { id: id });
  }

  getBlogsByUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}fetchblog.php`, { userId });
  }

  createPost(postData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'addPost.php', postData);
  }

  updatePost(id: string, postData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'editPost.php', {
      id,
      ...postData,
    });
  }

  deletePost(id: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'deletePost.php', { id });
  }
  getUsers(user: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'userList.php?uid=' + user);
  }

  followUser(followerId: number, followedId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/followUser.php`, {
      follower_id: +followerId,
      followed_id: followedId,
    });
  }

  unfollowUser(followerId: number, followedId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/unfollowUser.php`, {
      follower_id: followerId,
      followed_id: followedId,
    });
  }
  getPost(): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      this.apiUrl + 'getPost.php'
    );
  }
  getFollowedPosts(followerId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}fetchFollowedPosts.php`, {
      followerId,
    });
  }
}
