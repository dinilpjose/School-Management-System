import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { EditStudentFormComponent } from '../edit-student-form/edit-student-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [HomeComponent,StudentFormComponent,EditStudentFormComponent,DashboardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
