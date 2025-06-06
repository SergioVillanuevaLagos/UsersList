import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  selectedUser: any = null;
  isEdit: boolean = false;

  constructor(private userService: BeneficiaryService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
      },
      error: (error) => console.error('Error al cargar los usuarios', error)
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
      ? this.updateUser(this.selectedUser.id, this.selectedUser)
      : this.createUser(this.selectedUser);
  }

  createUser(user: any): void {
    if (!user.nombres || !user.apellidos || !user.rut) return;

    this.userService.createUser(user).subscribe({
      next: (newUser) => {
        this.loadUsers(); // Carga desde backend para asegurar consistencia
        this.resetForm();
      },
      error: (error) => console.error('Error al crear el usuario', error)
    });
  }

  updateUser(id: number, updatedUser: any): void {
    this.userService.updateUser(id, updatedUser).subscribe({
      next: (updated) => {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
          this.users[index] = updated;
          this.filteredUsers = [...this.users];
        }
        this.resetForm();
      },
      error: (error) => console.error('Error al actualizar el usuario', error)
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
        this.filteredUsers = [...this.users];
        if (this.selectedUser?.id === id) this.resetForm();
      },
      error: (error) => console.error('Error al eliminar el usuario', error)
    });
  }

  selectUser(user: any): void {
    this.selectedUser = { ...user };
    this.isEdit = true;
  }

  resetForm(): void {
    this.selectedUser = null;
    this.isEdit = false;
  }

  createNewUser(): void {
    this.selectedUser = {};
    this.isEdit = false;
  }
}
