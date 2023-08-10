import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardGuard } from 'src/app/guards/authguard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent ,canActivate: [AuthguardGuard] },
  { path: 'dashboard/:id', component: DashboardComponent ,canActivate: [AuthguardGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
