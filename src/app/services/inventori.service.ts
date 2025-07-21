import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

export interface Warehouse {
  id?: number;
  name: string;
  location: string;
  capacity: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Batch {
  id?: number;
  productId: string;
  quantity: number;
  expiryDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoriService {
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

  // Warehouse Management
  getAllWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(`${this.apiUrl}/api/bodegas`, { headers: this.getHeaders() });
  }

  getWarehouseById(id: number): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${this.apiUrl}/api/bodegas/${id}`, { headers: this.getHeaders() });
  }

  createWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(`${this.apiUrl}/api/bodegas`, warehouse, { headers: this.getHeaders() });
  }

  updateWarehouse(id: number, warehouse: Warehouse): Observable<Warehouse> {
    return this.http.put<Warehouse>(`${this.apiUrl}/api/bodegas/${id}`, warehouse, { headers: this.getHeaders() });
  }

  deleteWarehouse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/bodegas/${id}`, { headers: this.getHeaders() });
  }

  // Product Management
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/productos`, { headers: this.getHeaders() });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/api/productos/${id}`, { headers: this.getHeaders() });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/api/productos`, product, { headers: this.getHeaders() });
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/api/productos/${id}`, product, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/productos/${id}`, { headers: this.getHeaders() });
  }

  // Batch Management
  getAllBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(`${this.apiUrl}/api/lotes`, { headers: this.getHeaders() });
  }

  getBatchById(id: number): Observable<Batch> {
    return this.http.get<Batch>(`${this.apiUrl}/api/lotes/${id}`, { headers: this.getHeaders() });
  }

  createBatch(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(`${this.apiUrl}/api/lotes`, batch, { headers: this.getHeaders() });
  }

  updateBatch(id: number, batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(`${this.apiUrl}/api/lotes/${id}`, batch, { headers: this.getHeaders() });
  }

  deleteBatch(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/lotes/${id}`, { headers: this.getHeaders() });
  }
}
