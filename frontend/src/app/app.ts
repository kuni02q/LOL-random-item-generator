import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from './_component/navbar/navbar.component';
import { ChampionListComponent } from './_component/champion-list/champion-list.component';
import { ItemListComponent } from './_component/item-list/item-list.component';
import { BuildDisplayComponent } from './_component/build-display/build-display.component';
import { SavedBuildsComponent } from './_component/saved-builds/saved-builds.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent, ChampionListComponent, ItemListComponent, BuildDisplayComponent, SavedBuildsComponent, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('LOL Item Generator');
}
