import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { LoginRoutingModule } from './login-routing.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
