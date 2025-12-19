import {Component} from '@angular/core';
import { ChampionListComponent } from '../champion-list/champion-list.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { BuildDisplayComponent } from '../build-display/build-display.component';
import { SavedBuildsComponent } from '../saved-builds/saved-builds.component';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main-app.component.html',
  imports: [
    ChampionListComponent,
    ItemListComponent,
    BuildDisplayComponent,
    SavedBuildsComponent
  ],
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent {}
