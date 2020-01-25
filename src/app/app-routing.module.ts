import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { BookComponent } from './components/book/book.component';
import { AdminBookComponent } from './components/admin/admin-book/admin-book.component';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { IsEditorOrCollaboratorGuard } from './guards/is-editor-or-collaborator.guard';
import { NotLogguedGuard } from './guards/not-loggued.guard';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { IsAdminGuard } from './guards/is-admin.guard';


const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path: 'offers', component: OfertasComponent, canActivate : [IsLoggedGuard]},
  {path: 'user/login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'user/profile', component: ProfileComponent, canActivate : [IsLoggedGuard]},
  {path: 'admin/books', component: AdminBookComponent, canActivate : [IsLoggedGuard, IsEditorOrCollaboratorGuard]},
  {path: 'admin/users', component: AdminUserComponent, canActivate : [IsLoggedGuard, IsAdminGuard]},
  {path: 'book/:id', component: BookComponent},
  {path: '**', pathMatch : 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
