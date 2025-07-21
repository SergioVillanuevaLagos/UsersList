import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbard',
  templateUrl: './navbard.component.html',
  styleUrls: ['./navbard.component.css']
})
export class NavbardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private ruta: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
    });
  }

  ira(url: string): void {
    console.log(url);
    this.ruta.navigate([url]);
  }

  logout(): void {
    this.authService.logout();
    this.ruta.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }
}
