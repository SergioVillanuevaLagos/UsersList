import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  apiStatus = 'Checking...';
  userInfo: User | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkApiHealth();
    this.getUserInfo();
  }

  checkApiHealth(): void {
    this.http.get(`${environment.apiUrl}/health`)
      .subscribe({
        next: (response: any) => {
          this.apiStatus = `Connected - ${response.status}`;
        },
        error: (error: any) => {
          this.apiStatus = 'Connection failed';
          console.error('API Health check failed:', error);
        }
      });
  }

  getUserInfo(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.userInfo = user;
    });
  }
}
