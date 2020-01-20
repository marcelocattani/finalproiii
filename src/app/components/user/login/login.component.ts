import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles:[`.ng-invalid.ng-touched:not(form) {
    border : 1px solid red;
  }`]
})
export class LoginComponent implements OnInit {

  private usuario : Object = {
    email : null, 
    password : null
  }

  public loginError : boolean = false; 

  constructor(private autenfificacionService : AutentificacionService) { }


  ngOnInit() {    
    
  }

  public onIngresoUser(forma : NgForm){
     this.autenfificacionService.loginWithEmailAndPassword(this.usuario['email'], this.usuario['password'])
     .then(credential => console.log("logueado satisfactoriamente"))
     .catch(err => {
       this.usuario = {email : null, password : null};
       this.loginError = true; 
       setTimeout(() => {
         this.loginError= false; 
       }, 3500);
     });
  }
  

}
