import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {AngularFireFunctionsModule, FUNCTIONS_ORIGIN} from '@angular/fire/functions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    FormsModule,

    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,

    FlexLayoutModule,
    MatButtonModule,
  ],
  providers: [
    { provide: FUNCTIONS_ORIGIN, useValue: 'http://localhost:5000' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
