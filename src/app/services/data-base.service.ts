import { Injectable, EventEmitter } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  AngularFirestore,
  QueryFn
} from "@angular/fire/firestore";
import { bookInterface } from '../model/book';
import { userInterface } from "../model/user";


@Injectable({
  providedIn: "root"
})
export class DataBaseService {
  // private booksCollection : AngularFirestoreCollection<bookInterface>;
  // private userDocument : AngularFirestoreDocument<userInterface>;
  // private bookDoc : AngularFirestoreDocument<bookInterface>;
  public selectedBook: bookInterface = { id: null };
  public terminoBuscado$ = new EventEmitter<string>(); 

  constructor(private dataBase: AngularFirestore) {}

  // ------------------ L I B R O S -------------------------

  public getAllBooks(): Observable<bookInterface[]> {
    const booksCollection = this.dataBase.collection<bookInterface>("books");
    return booksCollection.snapshotChanges().pipe(
      map(data =>
        data.map(action => {
          const info = action.payload.doc.data() as bookInterface;
          info.id = action.payload.doc.id;
          return info;
        })
      )
    );
  }

  public getOneBook(id: string): Observable<bookInterface> {
    const bookDoc = this.dataBase.doc<bookInterface>("books/" + id);
    return bookDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists) {
          const data = action.payload.data() as bookInterface;
          data.id = action.payload.id;
          return data;
        } else {
          return null;
        }
      })
    );
  }

  public addBook(book: bookInterface) {
    const booksCollection = this.dataBase.collection<bookInterface>("books");
    booksCollection.add(book);
  }

  public updateBook(book: bookInterface) {
    const docBook = this.dataBase.doc<bookInterface>("books/" + book.id);
    docBook.update(book);
  }

  public deleteBook(idBook: string) {
    const docBook = this.dataBase.doc<bookInterface>("books/" + idBook);
    docBook.delete();
  }

  public getOffers(): Observable<bookInterface[]> {
    const booksCollection = this.dataBase.collection<bookInterface>(
      "books",
      ref => ref.where("oferta", "==", "1")
    );
    return booksCollection.snapshotChanges().pipe(
      map(data =>
        data.map(action => {
          const info = action.payload.doc.data() as bookInterface;
          info.id = action.payload.doc.id;
          return info;
        })
      )
    );
  }

  // public searchBooks(palabraBuscada: string): Observable<bookInterface[]> {
  //   console.log(palabraBuscada);

  //   const booksFinder = this.dataBase.collection<bookInterface>("books");
    

  //   return booksFinder.snapshotChanges().pipe(
  //     map(data =>
  //       data.map(action => {
  //         const info = action.payload.doc.data() as bookInterface;
  //         info.id = action.payload.doc.id;
  //         return info;
  //       })
  //     )
  //   );
  // }


  public query: QueryFn;

  // ---------- U S U A R I O ----------------------

  public getOneUser(id: string): Observable<userInterface> {
    const userDoc = this.dataBase.doc<userInterface>("users/" + id);
    return userDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists) {
          const data = action.payload.data() as userInterface;
          return data;
        } else {
          return null;
        }
      })
    );
  }

  public addUser(usuario: userInterface): void {
    const userDocument = this.dataBase.doc<userInterface>(
      "users/" + usuario.uid
    );
    userDocument.set(usuario, { merge: true });
  }
}
