import { Component, OnInit } from '@angular/core';
import { SalesInventoriService } from 'src/app/services/sales-inventori.service';
import { SalesTransaction } from 'src/app/services/sales-inventori.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {
  transactions: SalesTransaction[] = [];
  filteredTransactions: SalesTransaction[] = [];
  selectedTransaction: SalesTransaction | null = null;
  isEdit: boolean = false;
  searchTerm: string = '';

  constructor(private salesService: SalesInventoriService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.salesService.getAllSalesTransactions().subscribe({
      next: (data) => {
        console.log('Datos recibidos del backend:', data);
        this.transactions = data;
        this.filteredTransactions = data;
      },
      error: (err) => console.error('Error al cargar transacciones:', err)
    });
  }


  // Filtrar por búsqueda
  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredTransactions = this.transactions.filter(t =>
      t.customerId.toLowerCase().includes(term) ||
      (t.transactionDate && t.transactionDate.toLowerCase().includes(term))
    );
  }

  // Seleccionar para editar
  selectTransaction(transaction: SalesTransaction): void {
    this.selectedTransaction = JSON.parse(JSON.stringify(transaction)); // Clonamos para evitar editar directamente
    this.isEdit = true;
  }

  // Agregar nuevo producto
  addProduct(): void {
    if (this.selectedTransaction) {
      this.selectedTransaction.products.push({
        productId: '',
        quantity: 1,
        unitPrice: 0
      });
    }
  }

  // Eliminar producto de la lista
  removeProduct(index: number): void {
    this.selectedTransaction?.products.splice(index, 1);
  }

  // Guardar transacción (crear o actualizar)
  saveTransaction(): void {
    if (!this.selectedTransaction) return;

    const transaction = this.selectedTransaction;

    // Calcular total si no viene
    transaction.totalAmount = transaction.products.reduce(
      (sum, p) => sum + (p.quantity * p.unitPrice),
      0
    );

    if (this.isEdit && transaction.id) {
      this.salesService.updateSalesTransaction(transaction.id, transaction).subscribe({
        next: () => {
          this.resetForm();
          this.loadTransactions();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      this.salesService.createSalesTransaction(transaction).subscribe({
        next: () => {
          this.resetForm();
          this.loadTransactions();
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  // Eliminar transacción
  deleteTransaction(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID de transacción no válido');
      return;
    }

    if (!confirm('¿Estás seguro de eliminar esta transacción?')) return;

    this.salesService.deleteSalesTransaction(id).subscribe({
      next: () => this.loadTransactions(),
      error: (err) => console.error('Error al eliminar:', err)
    });
  }

  // Resetear formulario
  resetForm(): void {
    this.selectedTransaction = null;
    this.isEdit = false;
  }
}
