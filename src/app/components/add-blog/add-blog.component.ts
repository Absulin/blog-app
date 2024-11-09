import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {
  postForm: FormGroup;
  userId: string = '';
  selectedFiles:File |null=null;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService, 
    private router: Router, 
    private authService: AuthService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  get title() {
    return this.postForm.get('title');
  }

  get content() {
    return this.postForm.get('content');
  }

  onImageChange(event: any) {
    this.selectedFiles = event.target.files[0];
  }

  createPost() {
    if (this.postForm.invalid) {
      return;
    }

    const userId = this.authService.getUserId(); 
    if (!userId) {
      console.error('User ID not found. Cannot create post.');
      return; 
    }

    const formData = new FormData();
    formData.append('title', this.title?.value ?? ''); 
    formData.append('content', this.content?.value ?? ''); 
    formData.append('user_id', userId);

    if (this.selectedFiles) {
      formData.append('file', this.selectedFiles, this.selectedFiles.name);
    }

    this.apiService.createPost(formData).subscribe({
      next: (result) => {
        if (result.success) {
          alert("Blog Created");
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
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}
