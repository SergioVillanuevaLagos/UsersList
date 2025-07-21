import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService, LoginResponse } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  loginData = {
    username: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    console.log('Form submitted', this.loginData);
    console.log('Form valid:', this.loginForm?.valid);

    if (!this.loginForm?.valid) {
      console.log('Form validation errors:', this.loginForm?.errors);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData.username, this.loginData.password)
      .subscribe({
        next: (response: LoginResponse) => {
          this.isLoading = false;
          console.log('Login successful:', response);
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Login error:', error);
          this.errorMessage = error.error?.message || 'Error al iniciar sesión';
        }
      });
  }

  // Method to check if form is valid
  isFormValid(): boolean {
    return this.loginData.username.trim() !== '' &&
           this.loginData.password.trim() !== '';
  }
}
