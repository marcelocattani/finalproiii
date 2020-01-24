import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { userInterface } from "../model/user";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { auth } from "firebase";
import { Router } from "@angular/router";
import { DataBaseService } from "./data-base.service";
import { promise } from "protractor";

@Injectable({
  providedIn: "root"
})
export class AutentificacionService {  
  public registrandose: boolean = false; //Bandera para saber si se esta registrando

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private dataBaseService: DataBaseService
  ) {
              
  }

  public loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(userData => {
          this.router.navigate(["/home"]);
          resolve(userData);
        })
        .catch(err => reject(err));
    });
  }

  public registerUser(
    email: string,
    password: string
  ): Promise<auth.UserCredential> {
    this.registrandose = true;
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(credentials => resolve(credentials))
        .catch(err => reject(err));
    });
  }

  public loginWithGoogle() {
    return this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(credentials => {
        this.saveUser(credentials);
      });
  }

  private saveUser(credentials: auth.UserCredential) {
    if (credentials.additionalUserInfo.isNewUser) {
      const user: userInterface = {
        nombre: credentials.user.displayName,
        email: credentials.user.email,
        imagen: credentials.user.photoURL,
        rol: "client",
        uid: credentials.user.uid
      };
      

      this.dataBaseService.addUser(user);
    }
  }

  public loginWithFacebook() {
    return this.afAuth.auth
      .signInWithPopup(new auth.FacebookAuthProvider())
      .then(credentials => {
        this.saveUser(credentials);
      });
  }
  public logout() {
    this.afAuth.auth
      .signOut()
      .then(() => this.router.navigate(["/user/login"]));
  }

  public isLogged(): Observable<boolean> {
    return Observable.create(
      observer => {
        this.afAuth.auth.onAuthStateChanged(data => {
          if (data) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        });
      },
      err => console.log(err)
    );
  }

  public getAuth(): Observable<firebase.User> {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  public getCurrentUser(): Observable<userInterface> {
    return Observable.create(observer => {
      this.getAuth().subscribe(data => {
        if (data) {
          this.dataBaseService.getOneUser(data.uid).subscribe(
            info => {
              observer.next(info);
            },
            err => observer.error(err)
          );
        }
      });
    });
  }
}
