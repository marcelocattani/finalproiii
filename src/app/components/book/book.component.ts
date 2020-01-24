import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataBaseService } from "../../services/data-base.service";
import { bookInterface } from "../../model/book";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"]
})
export class BookComponent implements OnInit, OnDestroy {

  private id: string;
  private libro: bookInterface = {};
  private yaCargo: boolean = false;
  private existe: boolean = true;
  private subscripcion : Subscription;

  constructor(
    private router: ActivatedRoute,
    private dataBase: DataBaseService
  ) {
    this.id = router.snapshot.params.id;
  }

  ngOnInit() {
    this.subscripcion = this.dataBase.getOneBook(this.id).subscribe(data => {
      if (data) {
        this.existe = true; 
        this.libro = data;
        this.yaCargo = true;
      } else {
        this.yaCargo = true; 
        this.existe = false; 
      }
    });
  }

  ngOnDestroy(){
    this.subscripcion.unsubscribe();
  }
}
