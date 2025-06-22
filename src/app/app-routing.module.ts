import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './shared/components/user-list/user-list.component';
import { UserRegistrerComponent } from './shared/components/user-registrer/user-registrer.component';
import { SalesComponent } from './views/sales/sales.component';

// Importa tu componente Home aquí

const routes: Routes = [
  { path: '', component: HomeComponent },  // carga home al acceder a la raíz
  { path: 'home', component: HomeComponent },  // opcional si quieres que /home también funcione
  { path: 'Beneficiarios', component: UserListComponent },
  { path: 'Registro', component: UserRegistrerComponent },
  { path: 'ventas', component: SalesComponent }
  // otras rutas
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
