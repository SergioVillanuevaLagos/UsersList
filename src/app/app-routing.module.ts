import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './shared/components/user-list/user-list.component';
import { UserRegistrerComponent } from './shared/components/user-registrer/user-registrer.component';
import { SalesComponent } from './views/sales/sales.component';
import { LoginComponent } from './views/login/login.component';
import { BeneficiariosComponent } from './views/beneficiarios/beneficiarios.component';
import { RegistrarUsuariosComponent } from './views/registrar-usuarios/registrar-usuarios.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'beneficiarios',
    component: BeneficiariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registrar-usuarios',
    component: RegistrarUsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ventas',
    component: SalesComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
