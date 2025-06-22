import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaces opcionales (puedes moverlas a un archivo aparte si deseas)
export interface Product {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface SalesTransaction {
  id?: string;
  transactionDate?: string;
  customerId: string;
  products: Product[];
  paymentMethod: 'cash' | 'credit_card' | 'debit_card' | 'bank_transfer' | 'digital_wallet';
  totalAmount?: number;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SalesInventoriService {
  //Cambiar la URL a la de tu API real
  private apiUrl = 'http://localhost:3000/api/sales-transactions';

  constructor(private http: HttpClient) {}

  // Crear una nueva transacción de venta
  createSalesTransaction(data: SalesTransaction): Observable<SalesTransaction> {
    return this.http.post<SalesTransaction>(this.apiUrl, data);
  }

  // Obtener todas las transacciones
  getAllSalesTransactions(): Observable<SalesTransaction[]> {
    return this.http.get<SalesTransaction[]>(this.apiUrl);
  }

  // Obtener una transacción por ID
  getSalesTransactionById(id: string): Observable<SalesTransaction> {
    return this.http.get<SalesTransaction>(`${this.apiUrl}/${id}`);
  }

  // Actualizar una transacción por ID
  updateSalesTransaction(id: string, data: SalesTransaction): Observable<SalesTransaction> {
    return this.http.put<SalesTransaction>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar una transacción por ID
  deleteSalesTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
