import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { TaskUploadPhoto } from '../model/photo';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private TareaSubida : TaskUploadPhoto  = {
    task : null, 
    ref : null
  };

  constructor(private storage : AngularFireStorage) { }

  public uploadFile (archivo : File) : TaskUploadPhoto {    

    const id = Math.random().toString(36).substring(2);
    const filePath = `profile_images/profile_${id}`;
    this.TareaSubida.ref = this.storage.ref(filePath);
    this.TareaSubida.task = this.storage.upload(filePath, archivo);

    
    return this.TareaSubida;
  }

}
