import { Component, OnChanges, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: Observable<firebase.User>;
  showLoginForm = false;
  showRegisterForm = false;
  showConnForm = false;
  email: string;
  senha: string;
  name: string;
  urlImage: string;
  providers: string[] = []

  constructor(public afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
    this.updateProviders()
  }

  updateProviders() {
    this.afAuth.authState.subscribe((evt) => {
      if (evt) {
        this.providers = evt.providerData.map(el => el.providerId)
      }
    })
  }

  vinculaFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        firebase
          .auth()
          .currentUser.linkWithCredential(res.credential)
          .then(
            user => {
              this.updateProviders()
              console.log('ok');
            },
            err => {
              console.log(err);
            }
          );
      })
      .catch(err => {
        firebase.auth().currentUser.linkWithCredential(err.credential)
        .then(
          user => {
            this.updateProviders()
            console.log('ok');
          },
          err => console.log(err)

        );
      });
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginGithub() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  vinculaGithub() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(res => {
        firebase
          .auth()
          .currentUser.linkWithCredential(res.credential)
          .then(
            user => {
              console.log('ok');
            },
            err => {
              console.log('err');
            }
          );
      })
      .catch(err => {
        firebase.auth().currentUser.linkWithCredential(err.credential)
        .then(
          user => {
            this.updateProviders()
            console.log('ok');
          },
          err => console.log(err)

        );
      });
  }

  loginEmail() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.senha)
      .catch((err: any) => {
        console.log(err);
      });
    this.showLoginForm = !this.showLoginForm;
  }

  vinculaEmail() {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.email,
      this.senha
    );
    firebase
      .auth()
      .currentUser.linkWithCredential(credential)
      .then(
        user => {
          this.updateProviders()
          console.log('ok');
        },
        err => {
          console.log('err');
        }
      );
      this.showConnForm = !this.showConnForm
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  signup() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.senha)
      .then(response => {
        console.log(response);
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: this.name,
          photoURL: this.urlImage
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
    this.showRegisterForm = false;
    this.showConnForm = false;
    this.showLoginForm = false;
  }
}
