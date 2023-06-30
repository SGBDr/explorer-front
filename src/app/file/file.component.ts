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

  open(){
    this.fileService.setLoading(true)
    this.fileService.getFile(this.file).subscribe(
      (rps) => {
        this.fileAR = rps.pdf
        this.fileService.setLoading(false)
        var file = new Blob([this.fileAR], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);

        window.open(fileURL);
      },
      (erro) => {
        console.log(erro)
      }
    )
  }

  ngOnInit(): void {

  }
}
