import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost/dbapp_api/'; 

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'blogSignup.php', user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'blogLogin.php', user);
  }

  getPost(): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'getPost.php', {});
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
    return this.http.post<any>(this.apiUrl + 'editPost.php', { id, ...postData });
  }

  deletePost(id: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'deletePost.php', { id });
  }
  deletePosts(id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}delettePostNew.php`, { id });  
  }
}
