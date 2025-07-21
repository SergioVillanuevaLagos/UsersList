import { Component, OnInit } from '@angular/core';
import { BeneficiaryService, Beneficiary } from 'src/app/services/beneficiary.service';

@Component({
  selector: 'app-user-registrer',
  templateUrl: './user-registrer.component.html',
  styleUrls: ['./user-registrer.component.css']
})
export class UserRegistrerComponent implements OnInit {
  users: Beneficiary[] = [];
  filteredUsers: Beneficiary[] = [];
  selectedUser: Beneficiary | null = null;
  isEdit: boolean = false;

  constructor(private userService: BeneficiaryService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllBeneficiaries().subscribe({
      next: (data: Beneficiary[]) => {
        this.users = data;
        this.filteredUsers = [...this.users];
      },
      error: (error: any) => console.error('Error al cargar los usuarios', error)
    });
  }

  onSearch(term: string): void {
    const lowerTerm = term.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.nombres?.toLowerCase().includes(lowerTerm) ||
      user.apellidos?.toLowerCase().includes(lowerTerm) ||
      user.rut?.toLowerCase().includes(lowerTerm) ||
      user.email?.toLowerCase().includes(lowerTerm) ||
      user.comuna?.toLowerCase().includes(lowerTerm) ||
      user.telefono?.toLowerCase().includes(lowerTerm)
    );
  }

  saveUser(): void {
    if (!this.selectedUser) return;
    this.isEdit
      ? this.updateUser(this.selectedUser.id!, this.selectedUser)
      : this.createUser(this.selectedUser);
  }

  createUser(user: Beneficiary): void {
    if (!user.nombres || !user.apellidos || !user.rut) return;

    this.userService.createBeneficiary(user).subscribe({
      next: (newUser: Beneficiary) => {
        this.loadUsers(); // Carga desde backend para asegurar consistencia
        this.resetForm();
      },
      error: (error: any) => console.error('Error al crear el usuario', error)
    });
  }

  updateUser(id: number, updatedUser: Beneficiary): void {
    this.userService.updateBeneficiary(id, updatedUser).subscribe({
      next: (updated: Beneficiary) => {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
          this.users[index] = updated;
          this.filteredUsers = [...this.users];
        }
        this.resetForm();
      },
      error: (error: any) => console.error('Error al actualizar el usuario', error)
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteBeneficiary(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
        this.filteredUsers = [...this.users];
        if (this.selectedUser?.id === id) this.resetForm();
      },
      error: (error: any) => console.error('Error al eliminar el usuario', error)
    });
  }

  selectUser(user: Beneficiary): void {
    this.selectedUser = { ...user };
    this.isEdit = true;
  }

  resetForm(): void {
    this.selectedUser = null;
    this.isEdit = false;
  }

  createNewUser(): void {
    this.selectedUser = {} as Beneficiary;
    this.isEdit = false;
  }
}
