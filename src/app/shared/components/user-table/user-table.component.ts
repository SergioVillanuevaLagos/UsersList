import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: any[] = [];
  isLoading = false;

  @Output() onHandleShowDetailProduct = new EventEmitter<any>();
  @Output() sendTableFilterColumn = new EventEmitter<any>();
  @Output() sendTableFilterPage = new EventEmitter<number>();
  @Output() onHandleShowHistoryModal = new EventEmitter<any>();
  @Output() onHandleOpenModalVoucher = new EventEmitter<any>();

  constructor(private userService: BeneficiaryService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.isLoading = false;
      }
    });
  }

  onSortColumn(sortable: any): void {
    this.sendTableFilterColumn.emit(sortable);
  }

  showDetailProduct(user: any): void {
    this.onHandleShowDetailProduct.emit(user);
  }

  changePage(page: number): void {
    this.sendTableFilterPage.emit(page);
  }

  showHistory(user: any): void {
    this.onHandleShowHistoryModal.emit(user);
  }

  openVoucher(user: any): void {
    this.onHandleOpenModalVoucher.emit(user);
  }
  @Input() isLoadingList: boolean = false;
}
