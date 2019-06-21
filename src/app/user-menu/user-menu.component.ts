import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  isLoggedIn = false;

  email = '';
  pass: '';
  user: User;

  constructor(public afAuth: AngularFireAuth, public dialog: MatDialog) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      this.isLoggedIn = (user !== null);
    });
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.animal = result;
    });
  }

}
