import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {importProvidersFrom} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './app/_auth/auth.service';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {JwtInterceptor} from './app/_auth/jwt.interceptor';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(ReactiveFormsModule),  // ha a standalone LoginComponent formot használ
    AuthService,                                // AuthService a DI-hez
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)// HttpClient és az interceptor engedélyezése
  ]
}).catch(err => console.error(err));
