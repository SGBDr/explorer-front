import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Directory } from '../models/Directory';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {
  currentDir!: Directory;
  loading: Boolean = true;

  constructor(private fileService: FileService){
  }

  ngOnInit(): void {
    this.fileService.initOrRefresh();
    this.fileService.getCurrentSubject().subscribe(current => this.currentDir = current)
    this.fileService.getLoadingSubject().subscribe(loading => this.loading = loading)
  }

  back(): void{
    this.fileService.backToPrevious();
  }

  open(currentID: number): void{
    this.fileService.enterDir(currentID, this.currentDir)
  }

}
