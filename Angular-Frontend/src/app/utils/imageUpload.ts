import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage'

export const fileUploader = async (event: any) => {
    let fireStorage!: AngularFireStorage
    let task: AngularFireUploadTask
    const basePath = '/images'
    let arr: string[] = [];

    const file = event.target.files[0];
    if (file) {
        const filePath = `${basePath}/${file.name}`
      
        task = fireStorage.upload(filePath, file) ;

        (await task).ref.getDownloadURL().then((url: any) => {
            console.log(url,'url')
            url.split('/').map((data: any, index: number) => {
                console.log(data,'data')
                if (index > 4) { arr.push(data) }
            })
        }
        )
        return arr.join('/')
    } else {
        alert('No Images selected')
        return ''
    }

}