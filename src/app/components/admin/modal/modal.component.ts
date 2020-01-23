import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataBaseService } from '../../../services/data-base.service';
import { AutentificacionService } from '../../../services/autentificacion.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  
  constructor(public database : DataBaseService, 
    public authService : AutentificacionService) {    
    }    
    
    public titulo : string; 
    public userId : string;
    private userRol : string; 
      
    @ViewChild('btnClose' ,{static :true}) btnClose : ElementRef;
    
    ngOnInit() {   
      this.getUserId();
    } 

  public onSaveBook(forma : NgForm){ 
    
    //Como administraodor no se le quita el poder a un  editor o colaborador
    if ( (this.userRol == "admin" || this.userRol == "collaborator") && forma.value.id != null) { 
      forma.value.uid = this.database.selectedBook.uid; 
    }    

    if ( forma.value.id === null ){            
      this.database.addBook(forma.value);      
    } else {            
      this.database.updateBook(forma.value);  
    }
    this.btnClose.nativeElement.click();         
  }

  public getUserId(){
    this.authService.getCurrentUser().subscribe( data => {
      this.userId = data.uid
      this.userRol = data.rol;
    }
    );
  }

}
