import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Directory } from './../models/Directory';
import { File } from '../models/File';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  //variables
  treeDir!: Directory;
  currentDir!: Directory;
  loading: Boolean = true;

  //Subject
  treeSubject: Subject<Directory> = new Subject();
  currentSubject: Subject<Directory> = new Subject();
  loadingSubject: Subject<Boolean> = new Subject();

  constructor(private http: HttpClient) {
    this.initOrRefresh();
  }

  emitAll(val: Boolean){
    this.treeSubject.next(this.treeDir);
    this.currentSubject.next(this.currentDir);
    this.loading = val;
    this.loadingSubject.next(this.loading);
  }

  setLoading(val: Boolean){
    this.loading = val;
    this.loadingSubject.next(this.loading);
  }

  enterDir(currentID: number, actDir: Directory){
    this.setLoading(true);
    for(var dir of actDir.directoryList){
      if(dir.id === currentID){
        this.currentDir = dir;
        this.emitAll(false);
        break;
      }
    }
  }

  backToPrevious(tree: Directory = this.treeDir): void{
    if(this.haveChild(this.currentDir.id, tree.directoryList)){
      this.currentDir = tree;
      this.emitAll(false);
    }else{
      for(var dir of tree.directoryList)
        this.backToPrevious(dir)
    }
  }

  haveChild(currentID: number, dirs: Directory[]): Boolean{
    for(var dir of dirs)
      if(dir.id === currentID)
        return true;
    return false;
  }

  getFile(file: File): Observable<any>{
    return this.http.post("http://localhost:8080/file", file, {
      responseType: 'arraybuffer',
      headers: new HttpHeaders().append('Content-Type', 'application/pdf')
    })
  }

  getPDF(file: File): Observable<Blob>{
    var url = "http://localhost:8080/file";
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', responseType : 'blob'});

    return this.http.post<Blob>(url, file, { headers : headers,responseType : 'blob' as 'json'});
  }


  initOrRefresh(){
    this.setLoading(true);
    this.http.get<Directory>("http://localhost:8080/getMap").subscribe(
      (rps) => {
        this.treeDir = rps;
        this.currentDir = rps;
        this.emitAll(false);
      },
      (err) => {
        console.log(err);
        this.treeDir = {name: "Error while requesting the backend", url: "null", fileList: [], directoryList: [], id: 0};
        this.currentDir = {name: "Error while requesting the backend", url: "null", fileList: [], directoryList: [], id: 0};
        this.emitAll(false);
      }
    )
  }

  getTreeSubject(): Subject<Directory>{
    return this.treeSubject;
  }

  getCurrentSubject(): Subject<Directory>{
    return this.currentSubject;
  }

  getLoadingSubject(): Subject<Boolean>{
    return this.loadingSubject;
  }
}
