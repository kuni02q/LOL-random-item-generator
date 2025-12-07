import {Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './_component/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import {MainAppComponent} from './_component/main-app/main-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, MainAppComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected readonly title = signal('LOL Item Generator');
}
