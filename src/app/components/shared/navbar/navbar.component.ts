import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../../../services/autentificacion.service';
import { DataBaseService } from '../../../services/data-base.service';
import { userInterface } from '../../../model/user';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public logueado : boolean; 
  public loadingPhoto : boolean = false;
  public usuarioCargado : boolean = false; 
  public user : userInterface;     

  constructor(private autentificacionService : AutentificacionService,
              private dataBaseService :  DataBaseService) { 
      
   }

  ngOnInit() {    
   this.cargarImagen();
  }

   public cargarImagen(){
    this.autentificacionService.isLogged().subscribe(data => {  
      this.logueado = data;
      this.loadingPhoto= true;
      if ( data) {
        // this.autentificacionService.getAuth().subscribe(info => {
        //   if(info) {
        //    this.dataBaseService.getOneUser(info.uid).subscribe( user => {
        //      this.user = user; 
        //      this.loadingPhoto = false;
        //   });
        //   }
        // });
        this.autentificacionService.getCurrentUser().subscribe(info => {
          this.loadingPhoto = false;
          this.usuarioCargado = true;  
          this.user = info;
        });
        
      }
    });
   }

  public salir(){    
    this.user = {} 
    this.loadingPhoto=false;
    this.usuarioCargado = false;     
    this.autentificacionService.logout();    
  }

}
