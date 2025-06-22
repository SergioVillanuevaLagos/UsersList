import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  paymentMethod: 'cash' | 'credit_card' | 'debit_card' | 'bank_transfer' | 'digital_wallet';
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

@Injectable({
  providedIn: 'root'
})
export class SalesInventoriService {
  private apiUrl = `${environment.apiUrl}/sales`;

  constructor(private http: HttpClient) {}

  // Crear una nueva transacción de venta
  createSalesTransaction(data: SalesTransaction): Observable<SalesTransaction> {
    return this.http.post<SalesTransaction>(this.apiUrl, data);
  }

  // Obtener todas las transacciones
  getAllSalesTransactions(): Observable<SalesTransaction[]> {
    return this.http.get<SalesApiResponse>(this.apiUrl).pipe(
      map(response => response.salesTransactions || [])
    );
  }

  // Obtener una transacción por ID
  getSalesTransactionById(id: number): Observable<SalesTransaction> {
    return this.http.get<SalesTransaction>(`${this.apiUrl}/${id}`);
  }

  // Actualizar una transacción por ID
  updateSalesTransaction(id: number, data: SalesTransaction): Observable<SalesTransaction> {
    return this.http.put<SalesTransaction>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar una transacción por ID
  deleteSalesTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
