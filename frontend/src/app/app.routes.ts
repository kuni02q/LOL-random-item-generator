import {Routes} from '@angular/router';
import {MainAppComponent} from './_component/main-app/main-app.component';
import {LoginComponent} from './_component/login/login.component';
import {AuthGuard} from './_auth/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: MainAppComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
