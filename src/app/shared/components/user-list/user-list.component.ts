import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  isEdit: boolean = false;

  constructor(private userService: BeneficiaryService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error al cargar los usuarios', err)
    });
  }

  saveUser(): void {
    if (!this.selectedUser) {
      console.warn('No hay usuario seleccionado para guardar.');
      return;
    }

    if (this.isEdit) {
      this.updateUser(this.selectedUser.id, this.selectedUser);
    } else {
      this.createUser(this.selectedUser);
    }
  }

  createUser(user: any): void {
    if (!user || !user.name) { // Ejemplo simple de validación
      console.warn('Datos incompletos para crear usuario');
      return;
    }

    this.userService.createUser(user).subscribe({
      next: (newUser) => {
        // Evita duplicados
        if (!this.users.some(u => u.id === newUser.id)) {
          this.users.push(newUser);
        }
        this.resetForm();
      },
      error: (err) => console.error('Error al crear el usuario', err)
    });
  }

  updateUser(id: number, updatedUser: any): void {
    if (!updatedUser || !id) {
      console.warn('Datos inválidos para actualizar usuario');
      return;
    }

    this.userService.updateUser(id, updatedUser).subscribe({
      next: (updated) => {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
          this.users[index] = updated;
        }
        this.resetForm();
      },
      error: (err) => console.error('Error al actualizar el usuario', err)
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
        if (this.selectedUser?.id === id) {
          this.resetForm();
        }
      },
      error: (err) => console.error('Error al eliminar el usuario', err)
    });
  }

  selectUser(user: any): void {
    this.selectedUser = { ...user }; // Clonar para no modificar la lista directamente
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
