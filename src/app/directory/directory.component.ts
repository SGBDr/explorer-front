import { Component, Input } from '@angular/core';
import { Directory } from './../models/Directory';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent {
  @Input() dir!: Directory;
  @Input() open!: any;


  openDir(id: number): void{
    this.open(id);
  }

  constructor(){}
}
