import { Component, OnInit, OnDestroy } from "@angular/core";
import { AutentificacionService } from "../../../services/autentificacion.service";
import { UploadService } from "../../../services/upload.service";
import { TaskUploadPhoto } from "../../../model/photo";
import { Observable, Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DataBaseService } from "../../../services/data-base.service";
import { auth } from "firebase";
import { userInterface } from "../../../model/user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  styles: [
    `
      .ng-invalid.ng-touched:not(form) {
        border: 1px solid red;
      }
    `
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  public usuario: Object = {
    email: null,
    password: null
  };
  private selectedFile: any;
  public porcentaje: Observable<number>;
  public emailExist: boolean;
  public cargandoFoto: boolean; // do : eliminar este valor para ocultar barra

  //Subscripciones a destruir
  public urlS: Subscription;
  public currentS: Subscription;

  constructor(
    private autentificacionService: AutentificacionService,
    private uploadService: UploadService,
    private router: Router,
    private dataBase: DataBaseService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.currentS.unsubscribe();
    this.urlS.unsubscribe();
  }

  public onSelectFile(event): void {
    this.selectedFile = event.target.files[0];
  }

  public onRegisterUser(): void {
    this.autentificacionService
      .registerUser(this.usuario["email"], this.usuario["password"])
      .then(credential => {
        //El correo es valido

        this.cargandoFoto = true;
        this.subirFoto(credential);
      })
      .catch(err => {
        if (err.code == "auth/email-already-in-use") {
          //El correo es invalido
          this.emailExist = true;
          setTimeout(() => {
            this.emailExist = false;
          }, 3500);
        }
      });
  }

  private subirFoto(credential: auth.UserCredential): void {
    const tareaDeSubida = this.uploadService.uploadFile(this.selectedFile);
    this.porcentaje = tareaDeSubida.task.percentageChanges();

    //OBTENIENDO LA URL
    tareaDeSubida.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.urlS = tareaDeSubida.ref.getDownloadURL().subscribe(url => {
            if (url) {
              this.currentS = this.autentificacionService
                .getAuth()
                .subscribe(current => {
                  if (current) {
                    current.updateProfile({ photoURL: url });
                    this.saveUserFirestore(credential, url);
                  }
                });
            }
          });
        })
      )
      .subscribe();
  }

  private saveUserFirestore(user: auth.UserCredential, photo: string) {
    const usuario: userInterface = {
      nombre: user.user.email.split("@")[0],
      email: user.user.email,
      imagen: photo,
      uid: user.user.uid,
      rol: "client"
    };

    this.dataBase.addUser(usuario);
    this.cargandoFoto = false;
    this.router.navigate(["/home"]);
    setTimeout(() => {
      this.autentificacionService.registrandose = false;
    }, 200);
  }
}
