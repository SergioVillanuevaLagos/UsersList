import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa tu componente Home aquí

const routes: Routes = [
  { path: '', component: HomeComponent },  // carga home al acceder a la raíz
  { path: 'home', component: HomeComponent },  // opcional si quieres que /home también funcione
  // otras rutas
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
