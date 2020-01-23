import { Component, OnInit } from "@angular/core";
import { AutentificacionService } from "../../../services/autentificacion.service";
import { DataBaseService } from "../../../services/data-base.service";
import { userInterface } from "../../../model/user";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public user: userInterface = {};
  public logueado : boolean = false;
  public infoCargada : boolean = false;  

  constructor(private autentificacionService: AutentificacionService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  public cargarDatos() {
    this.autentificacionService.isLogged().subscribe(data => {       
      this.logueado = data; 
      this.infoCargada = false; 
      if (data) {
        this.autentificacionService.getCurrentUser().subscribe(info => {
          this.user = info;
          setTimeout(() => {
            this.infoCargada = true; 
          }, 100);
        });
      }
    });
  }

  public salir() {
    this.logueado = false; 
    this.infoCargada = false; 
    this.user = {}
    this.autentificacionService.logout();
  }
}
