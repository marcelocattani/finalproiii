import { Component, OnInit} from '@angular/core';
import { DataBaseService } from '../../../services/data-base.service';
import { bookInterface } from '../../../model/book';
import { userInterface } from '../../../model/user';
import { AutentificacionService } from '../../../services/autentificacion.service';

@Component({
  selector: 'app-admin-book',
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin-book.component.css']
})
export class AdminBookComponent implements OnInit {
  
  public libros : bookInterface [];
  public user :  userInterface = {};
  public pageActual : number = 1;

  
  constructor(private dataBase : DataBaseService, 
              private autentificacion : AutentificacionService) { }

  

  ngOnInit() {
    this.cargarLibros();
    this.cargarUsuario();
  }

  public cargarLibros() {
    this.dataBase.getAllBooks().subscribe( data => {
      this.libros = data; 
    })
  }

  public cargarUsuario(){
    this.autentificacion.getCurrentUser().subscribe(data => {
      this.user = data; 
    })
  }

  public onDelete(id : string){
    if ( confirm("Esta seguro que desea eliminar") ) {
      this.dataBase.deleteBook(id);
    }
  }

  onPreUpdate(book : bookInterface){    
    this.dataBase.selectedBook = Object.assign({}, book);
  }

  
}
