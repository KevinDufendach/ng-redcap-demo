import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {functions, User} from 'firebase';
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

  projectFields: Field[];
  values = {};

  constructor(
    public afAuth: AngularFireAuth,
    private fns: AngularFireFunctions,
    private fieldService: FieldService) {
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
          this.updateValues();
        },
        error => {
          console.log(error);
          this.projectData = error;
        });
  }

  updateValues(): boolean {
    if (this.values && this.projectFields) {
      for (const field of this.projectFields) {
        field.assignValue(this.values);
      }

      console.log(this.projectFields);

      // Return true if values updated
      return true;
    }

    // Return false if not updated
    return false;
  }

  getValues(): void {
    const getRecordExport = this.fns.httpsCallable('getRecord');

    getRecordExport({form: 'adolescent_preferences'})
      .subscribe(result => {
          // console.log(result);
          this.values = result;

          this.updateValues();
        },
        error => {
          // ToDo: Do not log error if user does not exist

          console.log(error);
        });
  }

  submit() {
    const values = this.fieldService.getREDCapFormattedValues(this.projectFields);

    console.log(values);
    this.fieldService.submitFields(this.projectFields)
      .then(result => {
        console.log(result);
      }).catch(reason => {
        console.log('rejected submission: ' + reason);
      }
    );
  }
}
