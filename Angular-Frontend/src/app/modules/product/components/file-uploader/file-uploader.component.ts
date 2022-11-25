import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  constructor(private fireStorage: AngularFireStorage, private fireStore: AngularFirestore) { }

  basePath = '/images'
  downloadableURL = ''
  task!: AngularFireUploadTask

  progressValue!: Observable<number | undefined>

  ngOnInit(): void {
  }

  async onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`
      this.task = this.fireStorage.upload(filePath, file);

      this.progressValue = this.task.percentageChanges();

      (await this.task).ref.getDownloadURL().then((url: any) => { this.downloadableURL = url })
    } else {
      alert('No Images selected')
      this.downloadableURL = ''
    }
  }

}
