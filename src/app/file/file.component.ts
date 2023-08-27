import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { File } from '../models/File';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @Input() file!: File;
  fileAR: any;

  constructor(private fileService: FileService, private router: Router){}

  /*open(){
    this.fileService.setLoading(true)
    this.fileService.getFile(this.file).subscribe(
      (rps) => {
        this.fileAR = rps
        this.fileService.setLoading(false)
        var file = new Blob([this.fileAR], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);

        window.open(fileURL);
      },
      (erro) => {
        console.log(erro)
      }
    )
  }*/

  open(){
    this.fileService.getPDF(this.file)
      .subscribe(
        (data: Blob) => {
          var file = new Blob([data], { type: 'application/pdf' })
          var fileURL = URL.createObjectURL(file);

        // if you want to open PDF in new tab
          window.open(fileURL); 
          var a         = document.createElement('a');
          a.href        = fileURL; 
          a.target      = '_blank';
          a.download    = 'bill.pdf';
          document.body.appendChild(a);
          a.click();
        },
        (error) => {
          console.log('getPDF error: ',error);
        }
      );
  }

  ngOnInit(): void {

  }
}
