import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

interface User {
  id: number;
  name: string;
  isFollowed?: boolean;
 
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentUserId: number | null = null; 
  userId: string = '';

  constructor(
    private apiservice: ApiService,
    private authService: AuthService,private router:Router,
  ) {}

  ngOnInit(): void {
    this.currentUserId = Number(localStorage.getItem('userId'));
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiservice
      .getUsers(this.authService.getUserId())
      .subscribe((data: any) => {
        this.users = data['users'].map((user: User) => ({
          ...user,
          isFollowed: data['follow'].find((x: any) => x.followed_id == user.id)
            ? true
            : false,
        }));
        console.log(this.users);
      });
  }

  followUser(userId: number, followerId: number, onSuccess: () => void) {
    this.apiservice.followUser(followerId, userId).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.authService.followUser(userId);      
          onSuccess();
        } else {
          alert(response.message);
        }
      },
      (error: any) => {
        console.error('Error following user:', error);
        alert('An error occurred while following the user.');
      }
    );
  }

  unfollowUser(userId: number, followerId: number, onSuccess: () => void) {
    this.apiservice.unfollowUser(followerId,userId,).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.authService.unfollowUser(userId);
          onSuccess();
        } else {
          alert(response.message);
        }
      },
      (error: any) => {
        console.error('Error unfollowing user:', error);
        alert('An error occurred while unfollowing the user.');
      }
    );
  }
  toggleFollow(user: any) {
    const followerId = Number(this.currentUserId);

    if (!this.currentUserId) {
      alert('You need to log in first.');
      return;
    }

    if (user.isFollowed) {
      this.unfollowUser(user.id, followerId, () => {
        alert(`You unfollowed ${user.name} successfully.`);
      });
    } else {
      this.followUser(user.id, followerId, () => {
        alert(`You followed ${user.name} successfully.`);
      });
    }

    user.isFollowed = !user.isFollowed;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}
