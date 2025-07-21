import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

// Interfaces opcionales (puedes moverlas a un archivo aparte si deseas)
export interface Product {
  id?: number;
  salesTransactionId?: number;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface SalesTransaction {
  id?: number;
  transactionDate?: string;
  customerId: string;
  products: Product[];
  paymentMethod: 'cash' | 'credit_card' | 'debit_card' | 'bank_transfer' | 'digital_wallet' | null;
  totalAmount?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SalesApiResponse {
  totalTransactions: number;
  totalPages: number;
  currentPage: number;
  salesTransactions: SalesTransaction[];
}

export interface PurchaseTransaction {
  id?: number;
  transactionDate?: string;
  supplierId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalAmount?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SalesInventoriService {
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

  // Sales Transactions
  createSalesTransaction(data: SalesTransaction): Observable<SalesTransaction> {
    return this.http.post<SalesTransaction>(`${this.apiUrl}/api/sales`, data, { headers: this.getHeaders() });
  }

  getAllSalesTransactions(): Observable<SalesTransaction[]> {
    return this.http.get<SalesApiResponse>(`${this.apiUrl}/api/sales`, { headers: this.getHeaders() }).pipe(
      map((response: SalesApiResponse) => response.salesTransactions || [])
    );
  }

  getSalesTransactionById(id: number): Observable<SalesTransaction> {
    return this.http.get<SalesTransaction>(`${this.apiUrl}/api/sales/${id}`, { headers: this.getHeaders() });
  }

  updateSalesTransaction(id: number, data: SalesTransaction): Observable<SalesTransaction> {
    return this.http.put<SalesTransaction>(`${this.apiUrl}/api/sales/${id}`, data, { headers: this.getHeaders() });
  }

  deleteSalesTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/sales/${id}`, { headers: this.getHeaders() });
  }

  getSalesByRut(rut: string): Observable<SalesTransaction[]> {
    return this.http.get<SalesTransaction[]>(`${this.apiUrl}/api/sales/person/${rut}`, { headers: this.getHeaders() });
  }

  getSalesByDateRange(startDate: string, endDate: string): Observable<SalesTransaction[]> {
    return this.http.get<SalesTransaction[]>(`${this.apiUrl}/api/sales/date-range?startDate=${startDate}&endDate=${endDate}`, { headers: this.getHeaders() });
  }

  // Purchase Transactions
  createPurchaseTransaction(data: PurchaseTransaction): Observable<PurchaseTransaction> {
    return this.http.post<PurchaseTransaction>(`${this.apiUrl}/api/purchases`, data, { headers: this.getHeaders() });
  }

  getAllPurchaseTransactions(): Observable<PurchaseTransaction[]> {
    return this.http.get<PurchaseTransaction[]>(`${this.apiUrl}/api/purchases`, { headers: this.getHeaders() });
  }

  getPurchaseTransactionById(id: number): Observable<PurchaseTransaction> {
    return this.http.get<PurchaseTransaction>(`${this.apiUrl}/api/purchases/${id}`, { headers: this.getHeaders() });
  }

  updatePurchaseTransaction(id: number, data: PurchaseTransaction): Observable<PurchaseTransaction> {
    return this.http.put<PurchaseTransaction>(`${this.apiUrl}/api/purchases/${id}`, data, { headers: this.getHeaders() });
  }

  deletePurchaseTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/purchases/${id}`, { headers: this.getHeaders() });
  }

  getPurchasesByRut(rut: string): Observable<PurchaseTransaction[]> {
    return this.http.get<PurchaseTransaction[]>(`${this.apiUrl}/api/purchases/person/${rut}`, { headers: this.getHeaders() });
  }

  getPurchasesByDateRange(startDate: string, endDate: string): Observable<PurchaseTransaction[]> {
    return this.http.get<PurchaseTransaction[]>(`${this.apiUrl}/api/purchases/date-range?startDate=${startDate}&endDate=${endDate}`, { headers: this.getHeaders() });
  }
}
