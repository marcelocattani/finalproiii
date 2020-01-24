import { Component, OnInit, Input, OnDestroy, OnChanges } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { bookInterface } from "src/app/model/book";
import { DataBaseService } from "../../../services/data-base.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-tarjetas",
  templateUrl: "./tarjetas.component.html",
  styleUrls: ["./tarjetas.component.css"]
})
export class TarjetasComponent implements OnInit, OnDestroy {

  public pageActual : number = 1; 

  @Input()
  clase: string;

  public books: bookInterface[];
  public loading: boolean = true;
  public error: boolean;

  //Variables de busqueda
  public palabraBuscada: string;
  public subscripcion: Subscription;

  constructor(private dataBase: DataBaseService) {
    this.subscribirAInfo();
  }

  ngOnInit() {
    this.validarTipo(); //validando que pagina mostrar
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe(); //Desuscribirse del emiter para no causar problemas
  }

  private validarTipo() {
    if (this.clase == "all") {
      //si la clase por la que se cargo es home
      this.onGetAllBooks();
    } else {
      //Si la clase por la que se cargo es offers
      this.onGetOffers();
    }
  }

  private subscribirAInfo() {
    this.subscripcion = this.dataBase.terminoBuscado$.subscribe(data => {
      this.palabraBuscada = data; 
      if (data == "") {       
        //Si el texto esta ahora vacio valida cual pagina debe mostrar
        this.validarTipo();
      } else {         
        this.buscar(data);
      }
    });
  }

  private onGetAllBooks(): Promise<boolean | any> {
    return new Promise((resolve, reject) => {
      this.dataBase.getAllBooks().subscribe(
        data => {
          this.books = data;
          this.loading = false;
          resolve(true);
        },
        err => {
          this.error = true;
          reject(err);
        }
      );
    });
  }

  private onGetOffers() {
    this.dataBase.getOffers().subscribe(
      data => {
        this.books = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.error = true;
      }
    );
  }

  private buscar(termino: string) {
    this.onGetAllBooks().then(() => {
      //Filtra si el titulo o el autor coincide ambos en minusculas
      this.books = this.books.filter(value => {
        return (
          value.autor.toLowerCase().includes(termino.toLowerCase()) ||
          value.titulo.toLowerCase().includes(termino.toLowerCase())
        );
      });
    });
  }
}
