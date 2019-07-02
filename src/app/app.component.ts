import {Component, OnInit} from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/functions';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {FieldService} from '../../projects/ng-redcap/src/field/field.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  fs: FieldService;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private fns: AngularFireFunctions, private fieldService: FieldService) {
    this.fs = fieldService;
  }

  ngOnInit(): void {
  }

  testProjectDataFunction(): void {
    this.fieldService.loadProjectData('adolescent_preferences')
      .then(result => {
        console.log(result);
      });
  }

  getValues(): void {
    this.fieldService.loadUserRecords('adolescent_preferences')
      .then((result) => {
        // this.values = result;
      }).catch((error) => {
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
