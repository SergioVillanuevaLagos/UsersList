import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { HomeComponent } from './views/home/home.component';
import { NavbardComponent } from './shared/components/navbard/navbard.component';
import { UserTableComponent } from './shared/components/user-table/user-table.component';
import { UserListComponent } from './shared/components/user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchInputComponent } from './shared/components/search-input/search-input.component';
import { BeneficiariosComponent } from './views/beneficiarios/beneficiarios.component';
import { RegistrarUsuariosComponent } from './views/registrar-usuarios/registrar-usuarios.component';
import { UserRegistrerComponent } from './shared/components/user-registrer/user-registrer.component';
import { SalesListComponent } from './shared/components/sales-list/sales-list.component';
import { SalesComponent } from './views/sales/sales.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HomeComponent,
    NavbardComponent,
    UserTableComponent,
    UserListComponent,
    SearchInputComponent,
    BeneficiariosComponent,
    RegistrarUsuariosComponent,
    UserRegistrerComponent,
    SalesListComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
