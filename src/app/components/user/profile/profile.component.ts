import { Component, OnInit } from '@angular/core';
import { userInterface } from '../../../model/user';
import { DataBaseService } from '../../../services/data-base.service';
import { AutentificacionService } from '../../../services/autentificacion.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user  : userInterface; 
  public cargado : boolean = false;

  constructor( private dataBaseService : DataBaseService,
              private autentificacion : AutentificacionService) { }

  ngOnInit() {
    this.obtenerUsuario();
  }

  public obtenerUsuario(){
    this.autentificacion.getAuth().subscribe( dataUser => {
      if(dataUser) { 
        this.dataBaseService.getOneUser(dataUser.uid).subscribe(infoUser => {
          this.user = infoUser;
          this.cargado = true;  
        })
      }
    });
  }

}
