import { Component, OnInit } from "@angular/core";
import { AutentificacionService } from "../../../services/autentificacion.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  styles: [
    `
      .ng-invalid.ng-touched:not(form) {
        border: 1px solid red;
      }
    `
  ]
})
export class LoginComponent implements OnInit {
  private usuario: Object = {
    email: null,
    password: null
  };

  public loginError: boolean = false;

  constructor(
    private autenfificacionService: AutentificacionService,
    private router: Router
  ) {}

  ngOnInit() {}

  public onIngresoUser(forma: NgForm) {
    this.autenfificacionService
      .loginWithEmailAndPassword(
        this.usuario["email"],
        this.usuario["password"]
      )
      .then()
      .catch(err => {
        this.usuario = { email: null, password: null };
        this.loginError = true;
        setTimeout(() => {
          this.loginError = false;
        }, 3500);
      });
  }

  onRegisterGoogle() {
    this.autenfificacionService
      .loginWithGoogle()
      .then(() => this.router.navigate(["/home"]));
  }

  onRegisterFacebook() {
    this.autenfificacionService
      .loginWithFacebook()
      .then(() => this.router.navigate(["/home"]));
  }
}
