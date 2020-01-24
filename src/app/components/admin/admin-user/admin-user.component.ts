import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataBaseService } from '../../../services/data-base.service';
import { userInterface } from '../../../model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit, OnDestroy { 
  
  public pageActual : number = 1; 

  private usuarios : userInterface[] = [];
  private editando : boolean = false;
  private usuarioEditando : userInterface;  
  private subscripcion : Subscription; 

  constructor(private dataBase : DataBaseService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  public cargarUsuarios() : void {
   this.subscripcion =  this.dataBase.getAllUsers().subscribe( data => {
      this.usuarios = data; 
    })
  }

  private onEdit(usuario : userInterface){
    this.editando = true;   
    this.usuarioEditando = usuario; 
  }

  private onSelected(nuevoValor : string){
    this.usuarioEditando.rol = nuevoValor; 
  }

  private onSave(){
    this.dataBase.updateUser(this.usuarioEditando);
    this.editando = false; 
    this.usuarioEditando = {};

  }


}
