import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  blogs: any[] = [];  
  errorMessage: string = ''; 
  
  id: string = '';
  postData = {
    title: '',
    content: ''
  };

  constructor(private apiService: ApiService, private authService: AuthService,private router:Router) { }

  ngOnInit(): void { 
    this.loadUserBlogs();  
  }

  loadUserBlogs(): void {
    const userId = this.authService.getUserId(); 

    if (!userId) {
      this.errorMessage = 'User not logged in or user ID not found.';
      return;
    }

    this.apiService.getBlogsByUser(userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.blogs = response.data; 
        } else {
          this.errorMessage = 'No blogs found for this user.';
        }
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
        this.errorMessage = 'Error fetching blogs. Please try again later.';
      }
    });
  }
  deletePost(id:string): void {  
    if (confirm('Are you sure you want to delete this post?')) {
      this.apiService.deletePosts(id).subscribe({
        next: () => {
          alert('Post deleted successfully!');
          this.router.navigate(['/home']);  
        },
        error: (error) => {
          console.error('Error deleting post:', error);
          alert('Error deleting post!');
        }
      });
    }
  }
}