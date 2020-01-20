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
 

  constructor(private dataBase : AngularFirestore) {

  }

  public getAllBooks() : Observable<bookInterface[]> {

    const booksCollection = this.dataBase.collection<bookInterface>('libros');
    return booksCollection.snapshotChanges()
    .pipe ( map ( data => data.map ( action => {
      const info = action.payload.doc.data() as bookInterface;
      info.id = action.payload.doc.id; 
      return info;
    }
    )))    
  }
  
  public getOneBook(id: string) : Observable<bookInterface> {   
    
    const bookDoc = this.dataBase.doc<bookInterface>('libros/'+id);
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
        data.id = action.payload.id;
        return data;
      } else {
        return null;
      }
    }));
   }
 

  public getOffers() : Observable<bookInterface[]> {
    const booksCollection = this.dataBase.collection<bookInterface>('libros',ref => ref.where("oferta", "==", true));
    return booksCollection.snapshotChanges()
    .pipe ( map ( data => data.map ( action => {
      const info = action.payload.doc.data() as bookInterface; 
      info.id = action.payload.doc.id; 
      return info; 
    })))
  }

  public putUser( usuario : userInterface) : void {
    const userDocument = this.dataBase.doc<userInterface>('users/'+usuario.uid);
    userDocument.set(usuario,{ merge : true });
  }

 
  
  
}
