import { AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';

export class TaskUploadPhoto {
    ref : AngularFireStorageReference;
    task : AngularFireUploadTask;
}