import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {
  postData = {
    title: '',
    content: '',
    user_id: '',
  };

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  createPost() {
    this.postData.user_id = this.authService.getUserId(); 

    if (!this.postData.user_id) {
      console.error('User ID not found. Cannot create post.');
      return; 
    }

    console.log('Post data:', this.postData); // Debug: Log post data

    this.apiService.createPost(this.postData).subscribe({
      next: (result) => {
        console.log('Result from API:', result); // Debug: Log the result from the API
        if (result.success) {
          this.router.navigate(['/home']); 
        } else {
          console.error('Error:', result.message);
        }
      },
      error: (error) => {
        console.error('Error creating post:', error);
      }
    });
  }
}
