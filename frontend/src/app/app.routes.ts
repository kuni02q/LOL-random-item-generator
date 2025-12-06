import { Routes } from '@angular/router';
import { ChampionListComponent } from './_component/champion-list/champion-list.component';
import { ItemListComponent } from './_component/item-list/item-list.component';
import { BuildDisplayComponent } from './_component/build-display/build-display.component';
import { SavedBuildsComponent } from './_component/saved-builds/saved-builds.component';


export const routes: Routes = [
  { path: 'champions', component: ChampionListComponent },
  { path: 'items', component: ItemListComponent },
  { path: 'build', component: BuildDisplayComponent },
  { path: '**', redirectTo: 'champions' },
  { path: 'saved-builds', component: SavedBuildsComponent },
];
