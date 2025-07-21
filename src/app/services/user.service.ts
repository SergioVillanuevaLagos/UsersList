import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

export interface User {
  id?: number;
  username: string;
  password?: string;
  roles?: string[];
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Role {
  id?: number;
  name: string;
  description?: string;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Permission {
  id?: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...this.authService.getAuthHeaders()
    });
    return headers;
  }

  // User Management
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuarios`, { headers: this.getHeaders() });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/usuarios/${id}`, { headers: this.getHeaders() });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/usuarios`, user, { headers: this.getHeaders() });
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/usuarios/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`, { headers: this.getHeaders() });
  }

  // Admin User Management (requires admin role)
  getAllAdminUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuarios/admin`, { headers: this.getHeaders() });
  }

  createAdminUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/usuarios/admin`, user, { headers: this.getHeaders() });
  }

  updateAdminUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/usuarios/admin/${id}`, user, { headers: this.getHeaders() });
  }

  deleteAdminUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/admin/${id}`, { headers: this.getHeaders() });
  }

  // Role Management (admin only)
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/api/roles`, { headers: this.getHeaders() });
  }

  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/api/roles`, role, { headers: this.getHeaders() });
  }

  updateRole(id: number, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/api/roles/${id}`, role, { headers: this.getHeaders() });
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/roles/${id}`, { headers: this.getHeaders() });
  }

  // Permission Management (admin only)
  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.apiUrl}/api/permissions`, { headers: this.getHeaders() });
  }

  createPermission(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(`${this.apiUrl}/api/permissions`, permission, { headers: this.getHeaders() });
  }

  updatePermission(id: number, permission: Permission): Observable<Permission> {
    return this.http.put<Permission>(`${this.apiUrl}/api/permissions/${id}`, permission, { headers: this.getHeaders() });
  }

  deletePermission(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/permissions/${id}`, { headers: this.getHeaders() });
  }
}
