import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { BookComponent } from './components/book/book.component';


const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path: 'offers', component: OfertasComponent},
  {path: 'user/login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'user/profile', component: ProfileComponent},
  {path: 'book/:id', component: BookComponent},
  {path: '**', pathMatch : 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
