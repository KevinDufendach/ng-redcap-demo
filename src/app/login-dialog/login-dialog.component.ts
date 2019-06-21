import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  email = '';
  pass: '';

  constructor(
    private afAuth: AngularFireAuth,
    public dialogRef: MatDialogRef<LoginDialogComponent>) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user !== null) {
        this.dialogRef.close(user.uid + ' successfully logged in');
      }
    });
  }

  login(): void {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pass)
      .catch(e => console.log(e.message));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
