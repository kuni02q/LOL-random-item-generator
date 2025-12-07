import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BuildFavorite, FavoriteService} from '../../_service/favorite.service';
import {Observable} from 'rxjs';
import {TooltipDirective} from '../../_directive/tooltip/tooltip.directive';

@Component({
  selector: 'app-saved-builds',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './saved-builds.component.html',
  styleUrls: ['./saved-builds.component.scss']
})
export class SavedBuildsComponent implements OnInit {
  savedBuilds$!: Observable<BuildFavorite[]>;
  loading = false;
  error?: string;

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
    console.log("Edit build:", fav);
    // ide majd jöhet a módosítás logika
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


}
