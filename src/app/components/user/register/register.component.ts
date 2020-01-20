import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';
import { UploadService } from '../../../services/upload.service';
import { TaskUploadPhoto } from '../../../model/photo';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], 
  styles:[`.ng-invalid.ng-touched:not(form) {
    border : 1px solid red;
  }`]
})
export class RegisterComponent implements OnInit {
  
  public usuario : Object = {
    email : null,
    password  : null
  } 

  private selectedFile : any;
  private tareaDeSubida : TaskUploadPhoto;

  private porcentaje : Observable<number>;
  
  constructor(private autentificacionService : AutentificacionService,
              private uploadService: UploadService,
              private router: Router) { }

  ngOnInit() {
    
  }

  onRegisterUser(){
    
    //se retorna una Interface con la tarea de subida de archivo
    this.tareaDeSubida = this.uploadService.uploadFile(this.selectedFile);  

    this.porcentaje = this.tareaDeSubida.task.percentageChanges();
    this.tareaDeSubida.task.snapshotChanges().pipe( finalize (()=> {  
      //Una vez finalizado se registrarUsuario() enviandole el link de descarga 
      this.tareaDeSubida.ref.getDownloadURL().subscribe(data => {
        if (data) {
          this.registrarUsuario(data);
        }
      });      
    })).subscribe();

    

  }

  onSelectFile(event) {
   this.selectedFile =  event.target.files[0];  
  }

   private registrarUsuario(urlImagen : string) {

     console.log("registrando Usuario", urlImagen);
    this.autentificacionService.registerUser(this.usuario['email'], this.usuario['password'], urlImagen)
    .then(() => {
      console.log("renavegando a home")
      this.router.navigate(['/home'])
    });

    // .then ( () => {
    //     this.autentificacionService.getAuth().subscribe( data => {
    //       if (data) {
    //         data.updateProfile({photoURL : urlImagen })
    //         .then(() => {this.router.navigate(['/home'])})
    //         .catch((err) => console.log("ha ocurrido un erro en la asignacion de photo", err));
    //       }
    //     })       
    // })
    
   }


}
