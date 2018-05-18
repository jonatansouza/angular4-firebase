import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;
  showLoginForm: false;
  showRegisterForm: false;
  email: string;
  senha: string;
  name: string;
  urlImage: string;

  constructor(public afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginGithub() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  loginEmail() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.senha)
      .catch((err: any) => {
        console.log(err);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  signup() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.senha)
      .then((response) => {
        console.log(response);
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: this.name,
          photoURL: this.urlImage
        })
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
