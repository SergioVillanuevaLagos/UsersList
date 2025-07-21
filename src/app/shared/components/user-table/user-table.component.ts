import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BeneficiaryService, Beneficiary } from 'src/app/services/beneficiary.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: Beneficiary[] = [];
  isLoading = false;

  @Output() onHandleShowDetailProduct = new EventEmitter<Beneficiary>();
  @Output() sendTableFilterColumn = new EventEmitter<any>();
  @Output() sendTableFilterPage = new EventEmitter<number>();
  @Output() onHandleShowHistoryModal = new EventEmitter<Beneficiary>();
  @Output() onHandleOpenModalVoucher = new EventEmitter<Beneficiary>();
  @Input() isLoadingList: boolean = false;

  constructor(private userService: BeneficiaryService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllBeneficiaries().subscribe({
      next: (data: Beneficiary[]) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar usuarios', err);
        this.isLoading = false;
      }
    });
  }

  onSortColumn(sortable: any): void {
    this.sendTableFilterColumn.emit(sortable);
  }

  showDetailProduct(user: Beneficiary): void {
    this.onHandleShowDetailProduct.emit(user);
  }

  changePage(page: number): void {
    this.sendTableFilterPage.emit(page);
  }

  showHistory(user: Beneficiary): void {
    this.onHandleShowHistoryModal.emit(user);
  }

  openVoucher(user: Beneficiary): void {
    this.onHandleOpenModalVoucher.emit(user);
  }
}
