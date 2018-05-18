import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from 'angularfire2'
import {AngularFireAuthModule} from 'angularfire2/auth'
import {AngularFireDatabaseModule} from 'angularfire2/database'

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export const firebaseConfig = {
  apiKey: 'AIzaSyCXXE_VDdyOdsoCxrM04h5lC9EU_MIe_mo' ,
    authDomain: 'angular4curso-7317a.firebaseapp.com' ,
    databaseURL: 'https://angular4curso-7317a.firebaseio.com' ,
    projectId: 'angular4curso-7317a' ,
    storageBucket: 'angular4curso-7317a.appspot.com' ,
    messagingSenderId: '94834319198'
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
