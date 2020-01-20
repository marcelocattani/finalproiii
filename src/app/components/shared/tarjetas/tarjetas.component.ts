import { Component, OnInit, Input , OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import { bookInterface } from 'src/app/model/book';
import { DataBaseService } from '../../../services/data-base.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  @Input() 
  clase : string;

  private books : bookInterface[];
  public loading : boolean = true;
  public error : boolean;


  constructor(private dataBase : DataBaseService) { 
    
  }

  ngOnInit() {  
              
    this.error = false;

    if(this.clase == "all"){
      this.onGetAllBooks();      
    } else {
       this.onGetOffers();
    }
  }

  
  
  onGetAllBooks(){
    this.dataBase.getAllBooks().subscribe ( data=> {
     this.books = data;
     this.loading = false;
    }, err => {
      this.error = true
      console.log(err)});    
  }

  onGetOffers(){
    this.dataBase.getOffers().subscribe (data => {
      this.books = data; 
      this.loading = false;
    }, err => {
      this.loading = false;
      this.error = true; 
    })
  }

}
