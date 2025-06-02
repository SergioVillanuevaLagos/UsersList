import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

   // private apiUrl = `${environment.apiUrl}/users`;

    private users = [
      { id: 1, nombres: 'Juan', apellidos:'Pérez', email: 'juan@example.com', telefono: '123456789',comuna:'Chillan',rut:'11.111.111-1' },
      { id: 2, nombres: 'Ana', apellidos:'Gómez', email: 'ana@example.com', telefono: '987654321',comuna:'Chillan',rut:'22.222.222-2' }
    ];



    constructor() {}


    getAllUsers(): Observable<any> {
      return of(this.users);  // Simula la respuesta de la API
    }

    // Obtener un usuario por su ID
    getUserById(id: number): Observable<any> {
      const user = this.users.find(u => u.id === id);
      return of(user);  // Devuelve el usuario con el ID especificado
    }

    // Crear un nuevo usuario
    createUser(user: any): Observable<any> {
      user.id = this.users.length + 1;  // Asigna un nuevo ID
      this.users.push(user);  // Agrega el usuario a la lista
      return of(user);  // Devuelve el usuario creado
    }

    // Actualizar un usuario
    updateUser(id: number, user: any): Observable<any> {
      const index = this.users.findIndex(u => u.id === id);
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...user };  // Actualiza los datos
      }
      return of(this.users[index]);  // Devuelve el usuario actualizado
    }

    // Eliminar un usuario
    deleteUser(id: number): Observable<any> {
      const index = this.users.findIndex(u => u.id === id);
      if (index !== -1) {
        this.users.splice(index, 1);  // Elimina el usuario de la lista
      }
      return of({ message: 'Usuario eliminado' });  // Simula la eliminación
    }

}


