import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SalesTransaction } from './sales-inventori.service';

@Injectable({
  providedIn: 'root'
})
export class MockSalesService {
  private transactions: SalesTransaction[] = [
    {
      id: '1',
      transactionDate: '2024-06-01',
      customerId: 'cliente1',
      paymentMethod: 'cash',
      totalAmount: 15000,
      notes: 'Primera venta',
      products: [
        { productId: 'prod1', quantity: 2, unitPrice: 5000 },
        { productId: 'prod2', quantity: 1, unitPrice: 5000 }
      ]
    },
    {
      id: '2',
      transactionDate: '2024-06-15',
      customerId: 'cliente2',
      paymentMethod: 'credit_card',
      totalAmount: 20000,
      notes: '',
      products: [
        { productId: 'prod3', quantity: 4, unitPrice: 5000 }
      ]
    }
  ];

  getAllSalesTransactions(): Observable<SalesTransaction[]> {
    return of(this.transactions);
  }

  getSalesTransactionById(id: string): Observable<SalesTransaction | undefined> {
    const tx = this.transactions.find(t => t.id === id);
    return of(tx);
  }

  createSalesTransaction(transaction: SalesTransaction): Observable<SalesTransaction> {
    const newTransaction = { ...transaction, id: (Math.random() * 100000).toFixed(0) };
    this.transactions.push(newTransaction);
    return of(newTransaction);
  }

  updateSalesTransaction(id: string, updated: SalesTransaction): Observable<SalesTransaction> {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      this.transactions[index] = { ...updated, id };
    }
    return of(this.transactions[index]);
  }

  deleteSalesTransaction(id: string): Observable<void> {
    this.transactions = this.transactions.filter(t => t.id !== id);
    return of();
  }
}
