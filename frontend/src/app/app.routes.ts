import {Routes} from '@angular/router';
import { SavedBuildsComponent } from './_component/saved-builds/saved-builds.component';
import {MainAppComponent} from './_component/main-app/main-app.component';


export const routes: Routes = [
  { path: '', component: MainAppComponent },
  { path: '**', redirectTo: '' }
];
