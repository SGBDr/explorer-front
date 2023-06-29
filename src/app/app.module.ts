import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { DirectoryComponent } from './directory/directory.component';
import { FileComponent } from './file/file.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Routes, RouterModule } from '@angular/router';
import { ErroComponent } from './erro/erro.component';
import {HttpClientModule} from "@angular/common/http";

const appRoutes: Routes = [
  {
      path: '',
      component: ExplorerComponent
  },
  {
      path: '**',
      component: ErroComponent
  }
  ];

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    DirectoryComponent,
    FileComponent,
    NavBarComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
