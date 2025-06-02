import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];  // Lista de usuarios
  selectedUser: any = null;  // Usuario seleccionado para crear/editar
  isEdit: boolean = false;  // Bandera de modo edición

  constructor(private userService: BeneficiaryService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Cargar todos los usuarios
  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (error) => console.error('Error al cargar los usuarios', error)
    });
  }

  // Guardar usuario (crear o actualizar)
  saveUser(): void {
    if (!this.selectedUser) {
      console.warn('No hay datos del usuario');
      return;
    }

    if (this.isEdit) {
      this.updateUser(this.selectedUser.id, this.selectedUser);
    } else {
      this.createUser(this.selectedUser);
    }
  }

  // Crear nuevo usuario
  createUser(user: any): void {
    // Validación básica
    if (!user.nombres || !user.apellidos || !user.rut) {
      console.warn('Faltan datos obligatorios para crear el usuario');
      return;
    }

    this.userService.createUser(user).subscribe({
      next: (newUser) => {
        if (!this.users.some(u => u.id === newUser.id)) {
          this.users.push(newUser);
        }
        this.resetForm();
      },
      error: (error) => console.error('Error al crear el usuario', error)
    });
  }

  // Actualizar usuario existente
  updateUser(id: number, updatedUser: any): void {
    if (!id || !updatedUser) return;

    this.userService.updateUser(id, updatedUser).subscribe({
      next: (updated) => {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
          this.users[index] = updated;
        }
        this.resetForm();
      },
      error: (error) => console.error('Error al actualizar el usuario', error)
    });
  }

  // Eliminar un usuario
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
        if (this.selectedUser?.id === id) {
          this.resetForm();
        }
      },
      error: (error) => console.error('Error al eliminar el usuario', error)
    });
  }

  // Seleccionar usuario para editar
  selectUser(user: any): void {
    this.selectedUser = { ...user };
    this.isEdit = true;
  }

  // Limpiar formulario
  resetForm(): void {
    this.selectedUser = null;
    this.isEdit = false;
  }

  // Preparar formulario para nuevo usuario
  createNewUser(): void {
    this.selectedUser = {};
    this.isEdit = false;
  }
}
