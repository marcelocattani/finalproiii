import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

//Componentes
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { TarjetasComponent } from './components/shared/tarjetas/tarjetas.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { BookComponent } from './components/book/book.component';

//Pipes
import { TruncadorPipe } from './pipes/truncador.pipe';

//Forms Modules
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { AdminBookComponent } from './components/admin/admin-book/admin-book.component';
import { ModalComponent } from './components/admin/modal/modal.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    OfertasComponent,
    TarjetasComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BookComponent,
    TruncadorPipe,
    LoadingComponent,
    AdminBookComponent,
    ModalComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
