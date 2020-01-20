import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataBaseService } from '../../services/data-base.service';
import { bookInterface } from '../../model/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  private id : string; 
  private libro : bookInterface = {};
  private yaCargo : boolean = false;  

  constructor(private router : ActivatedRoute,
              private dataBase : DataBaseService) {
    this.id = router.snapshot.params.id;   
    
   }

  ngOnInit() {
    this.dataBase.getOneBook(this.id).subscribe(data => {
      this.libro = data; 
      this.yaCargo = true; 
    });
  }

}
