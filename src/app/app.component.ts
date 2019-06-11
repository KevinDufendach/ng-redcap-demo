import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: false;

  constructor(public afAuth: AngularFireAuth) {}

  login() {
    console.log('login button clicked');
  }
}
