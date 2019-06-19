import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {AngularFireFunctions} from '@angular/fire/functions';
import {Field} from '../../projects/ng-redcap/src/field/field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  email = '';
  pass: '';
  user: User;

  authText: '';
  projectData: any;

  projectFields: Field[];
  values = {};

  constructor(public afAuth: AngularFireAuth, private fns: AngularFireFunctions) {
  }

  login(): void {
    const signInPromise = this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pass);
    signInPromise.catch(e => console.log(e.message));
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      this.isLoggedIn = (user !== null);
    });
  }

  //
  // testAuthFunction(): void {
  //   const getUserData = this.fns.httpsCallable('getUserData');
  //   getUserData({
  //     data: 'my Data'
  //   }).subscribe(result => {
  //       this.authText = result;
  //     },
  //     error => {
  //       console.log(error);
  //       this.authText = error;
  //     });
  // }

  testProjectDataFunction(): void {
    const getMetadata = this.fns.httpsCallable('getMetadata');

    getMetadata({data: 'my Data'})
      .subscribe(result => {
          console.log(result);
          this.projectData = result;

          this.projectFields = Field.generateFieldsFromMetadataList(result);
        },
        error => {
          console.log(error);
          this.projectData = error;
        });
  }

  getValues(): void {
    const getRecordExport = this.fns.httpsCallable('getRecord');

    getRecordExport({form: 'adolescent_preferences'})
      .subscribe(result => {
          console.log(result);
          this.values = result;

          // if (result instanceof Array) {
          //   result.forEach(value => {
          //     console.log(value);
          //   });
          // }
        },
        error => {
          console.log(error);
        });
  }
}
