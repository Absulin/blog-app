import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  userId: string = '';

  constructor(private apiservices: ApiService, private httpclient: HttpClient, private authServices: AuthService,private router:Router) {
    this.userId = this.authServices.getUserId(); 
    this.loadPosts();
  }

  ngOnInit(): void {}

  loadPosts() {
    this.apiservices.getPost().subscribe({
      next: (result) => {
        if (result.success) {
          this.posts = result.data;
        } else {
          console.error('No posts found');
        }
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  getUserPosts() {
    return this.posts.filter(post => post.userId === this.userId);
  }

  logout() {
    this.authServices.logout();
    this.router.navigate(['/login']); 
  }
}
