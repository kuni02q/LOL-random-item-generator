import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BuildFavorite, FavoriteService} from '../../_service/favorite.service';
import {Observable} from 'rxjs';
import {TooltipDirective} from '../../_directive/tooltip/tooltip.directive';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-saved-builds',
  standalone: true,
  imports: [CommonModule, TooltipDirective, FormsModule],
  templateUrl: './saved-builds.component.html',
  styleUrls: ['./saved-builds.component.scss']
})
export class SavedBuildsComponent implements OnInit {
  savedBuilds$!: Observable<BuildFavorite[]>;
  loading = false;
  error?: string;
  searchText = '';

  @Output() editBuildEvent = new EventEmitter<BuildFavorite>();

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.savedBuilds$ = this.favoriteService.favorites$;

    this.loading = true;
    this.favoriteService.getAll().subscribe({
      next: () => this.loading = false,
      error: (err) => {
        this.error = err.message || 'Error loading favorites';
        this.loading = false;
      }
    });
  }

  hoveredEditId: string | null = null;
  hoveredDeleteId: string | null = null;

  editBuild(fav: BuildFavorite) {
    this.editBuildEvent.emit(fav);
  }

  deleteBuild(fav: BuildFavorite) {
    if (!confirm('Are you sure you want to delete this favorite build?')) {
      return;
    }

    this.favoriteService.remove(fav.id).subscribe({
      next: () => {
        console.log('Favorite build deleted:', fav.id);
        // A BehaviorSubject automatikusan frissíti a savedBuilds$ Observable-t
      },
      error: (err) => {
        console.error('Error deleting favorite build:', err);
        alert('Failed to delete favorite build.');
      }
    });
  }

  filteredBuilds(favs: BuildFavorite[] | null) {
    favs = favs ?? [];
    if (!this.searchText.trim()) return favs;

    return favs.filter(f =>
      (f.build.name ?? '').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


}
