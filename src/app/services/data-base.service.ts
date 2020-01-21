import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { bookInterface } from '../model/book';
import { userInterface } from '../model/user';
import { AutentificacionService } from './autentificacion.service';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {


  // private booksCollection : AngularFirestoreCollection<bookInterface>;
  // private userDocument : AngularFirestoreDocument<userInterface>;  
  // private bookDoc : AngularFirestoreDocument<bookInterface>; 
   public selectedBook : bookInterface = {id : null }; 

  constructor(private dataBase : AngularFirestore) {
  }


  public getAllBooks() : Observable<bookInterface[]> {

    const booksCollection = this.dataBase.collection<bookInterface>('books');
    return booksCollection.snapshotChanges()
    .pipe ( map ( data => data.map ( action => {
      const info = action.payload.doc.data() as bookInterface;
      info.id = action.payload.doc.id; 
      return info;
    }
    )))    
  }
  
  public getOneBook(id: string) : Observable<bookInterface> {   
    
    const bookDoc = this.dataBase.doc<bookInterface>('books/'+id);
    return bookDoc.snapshotChanges().pipe( map (action => {
      if (action.payload.exists){
        const data = action.payload.data() as bookInterface;
        data.id = action.payload.id;
        return data;
      } else {
        return null;
      }
    }));
   }

  public getOneUser(id: string) : Observable<userInterface> {   
    
    const userDoc = this.dataBase.doc<userInterface>('users/'+id);
    return userDoc.snapshotChanges().pipe( map (action => {
      if (action.payload.exists){
        const data = action.payload.data() as userInterface;        
        return data;
      } else {
        return null;
      }
    }));
   }
 

  public getOffers() : Observable<bookInterface[]> {
    const booksCollection = this.dataBase.collection<bookInterface>('books',ref => ref.where("oferta", "==", "1"));
    return booksCollection.snapshotChanges()
    .pipe ( map ( data => data.map ( action => {
      const info = action.payload.doc.data() as bookInterface; 
      info.id = action.payload.doc.id; 
      return info; 
    })))
  }

  public addUser( usuario : userInterface) : void {
    const userDocument = this.dataBase.doc<userInterface>('users/'+usuario.uid);
    userDocument.set(usuario,{ merge : true });
  }

  public addBook(book: bookInterface) {
    const booksCollection = this.dataBase.collection<bookInterface>('books');
    booksCollection.add(book);
  }

  public updateBook(book : bookInterface){   
    const docBook = this.dataBase.doc<bookInterface>('books/'+book.id);
    docBook.update(book);
  }

  public deleteBook(idBook : string){
    const docBook = this.dataBase.doc<bookInterface>('books/'+idBook);
    docBook.delete();
  }

 
  
  
}
