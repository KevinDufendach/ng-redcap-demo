import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {AngularFireFunctions} from '@angular/fire/functions';
import {Field} from '../../projects/ng-redcap/src/field/field';
import {FieldService} from '../../projects/ng-redcap/src/field/field.service';

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

  // projectFields: Field[];
  // values = {};

  fs: FieldService;

  constructor(public afAuth: AngularFireAuth, private fns: AngularFireFunctions, private fieldService: FieldService) {
    this.fs = fieldService;
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

  testProjectDataFunction(): void {
    this.fieldService.loadProjectData('adolescent_preferences')
      .then(result => {
        console.log(result);
      });
  }

  getValues(): void {
    this.fieldService.loadUserRecords('adolescent_preferences')
      .then( (result) => {
        // this.values = result;
      }).catch( (error) => {
        console.log(error);
    });
  }

  submit() {
    this.fieldService.submitFields()
      .then(() => {
        console.log('Save successful');
      }).catch(reason => {
        console.log('rejected submission: ' + reason);
      }
    );
  }
}
