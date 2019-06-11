import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  email = '';
  pass: '';
  user: User;

  constructor(public afAuth: AngularFireAuth) {}

  login(): void {
    const signInPromise = this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pass);
    signInPromise.catch(e => console.log(e.message));
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe( user => {
      this.user = user;
    });
  }
}
