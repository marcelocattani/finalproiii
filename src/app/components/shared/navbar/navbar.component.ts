import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private logueado : boolean;
  private imgUser : string;
  private loadingPhoto : boolean =false;    

  constructor(private autentificacionService : AutentificacionService) { 
      
   }

  ngOnInit() {    
   this.autentificacionService.isLogged().subscribe(data => {  
     this.logueado = data;
     if ( data) {
       this.autentificacionService.getImageUser().subscribe(data => {
         this.imgUser = data; 
       })
     }
   });
  }

  ngOnChanges() {
    this.cargarImagen();
  }

  public salir(){
    console.log("saliendo"); 
    this.imgUser = null; 
    this.autentificacionService.logout();    
  }

  private cargarImagen() : void {    
        
  }




}
