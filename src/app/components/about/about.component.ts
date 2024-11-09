import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{

  post: any; 
  userId: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService,private authservice:AuthService,private router:Router) {
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.loadPost(postId);
    }
  }

  loadPost(id: string) { 
    this.apiService.getPostById(id).subscribe({
      next: (result) => {
        if (result.success) {
          this.post = result.data; 
        } else {
          console.error('Post not found');
        }
      },
      error: (error) => {
        console.error('Error fetching post:', error);
      }
    });
  }
  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']); 
  }
}