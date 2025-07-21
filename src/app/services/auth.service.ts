import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface User {
  id?: number;
  username: string;
  password?: string;
  roles?: string[];
  permissions?: string[];
}

export interface LoginResponse {
  token: string;
  user: User;
  message?: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/usuarios`;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.getUserFromLocalStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get token(): string | null {
    return localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(map(response => {
        // Store token and user info
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
        return response;
      }));
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user?.roles?.includes(role) || false;
  }

  hasPermission(permission: string): boolean {
    const user = this.currentUserValue;
    return user?.permissions?.includes(permission) || false;
  }

  private getUserFromLocalStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get auth headers for HTTP requests
  getAuthHeaders(): { [key: string]: string } {
    const token = this.token;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
}
