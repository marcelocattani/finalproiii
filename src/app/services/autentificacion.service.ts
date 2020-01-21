import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { userInterface } from '../model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { DataBaseService } from './data-base.service';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

   
  

  constructor(private afAuth : AngularFireAuth,
              private router : Router,
              private dataBaseService : DataBaseService) { }

  public loginWithEmailAndPassword(email : string, password: string) : Promise<any>{
    return new Promise ( (resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then( userData => {
        this.router.navigate(['/home']);  
        resolve (userData) })
        .catch ( err => reject(err));      
    } )
  }

  public registerUser (email : string, password : string, photo : string) : Promise<auth.UserCredential> {
    return new Promise<auth.UserCredential> ( (resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then ( credential => { 
        this.getAuth().subscribe(data => {
          if (data) {          
            
            data.updateProfile({photoURL : photo});          
                
            this.addUserToFirebase(credential, photo);           
            
            resolve(credential)
          }          
        })       
      }),err => reject(err); 
    } )
  }
  
  public loginWithGoogle(){
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then( credentials => {
      if ( credentials.additionalUserInfo.isNewUser) {
        const user : userInterface = {
          nombre : credentials.user.displayName,          
          email : credentials.user.email,
          imagen : credentials.user.photoURL,
          rol : "client",
          uid: credentials.user.uid
        }
        this.dataBaseService.addUser(user);        
      }
    })
  }
  
  public loginWithFacebook(){
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    .then( credentials => {
      if ( credentials.additionalUserInfo.isNewUser) {
        const user : userInterface = {
          nombre : credentials.user.displayName,          
          email : credentials.user.email,
          imagen : credentials.user.photoURL,
          rol : "client",
          uid: credentials.user.uid
        }
        this.dataBaseService.addUser(user);        
      }
    })
  }
  public logout(){
    this.afAuth.auth.signOut().then (()=> this.router.navigate(['/user/login']));
  }

  public isLogged() : Observable<boolean> {
    return Observable.create( (observer)=> {
      
      this.afAuth.auth.onAuthStateChanged(data => {
        if (data) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      })
      
    }, err => console.log(err));
  }

  public getAuth() : Observable<firebase.User> {
    return this.afAuth.authState.pipe( map (auth => auth));
  } 

  public getCurrentUser() : Observable<userInterface>{
    return Observable.create( observer => {
      this.getAuth().subscribe(data => {
        if (data) {
          this.dataBaseService.getOneUser(data.uid).subscribe(info => {
            observer.next(info);
          }, err => observer.error(err))
        }
      })
    })
  }

  private addUserToFirebase(credenciales : auth.UserCredential, photo : string) : void{
     
    if (credenciales.additionalUserInfo.isNewUser) {

      const usuarioActual : userInterface = { 
      nombre : credenciales.user.email.split('@',1)[0], //Deduce el nombre a partir de la primer porcion de email 
      email : credenciales.user.email,
      imagen : photo,
      uid : credenciales.user.uid, 
      rol : "client"
      }
      this.dataBaseService.addUser(usuarioActual);
    }

  }

}
