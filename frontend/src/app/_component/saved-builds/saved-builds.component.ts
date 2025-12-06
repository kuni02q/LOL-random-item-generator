import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BuildFavorite, FavoriteService} from '../../_service/favorite.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-saved-builds',
  standalone: true,
  imports: [CommonModule],
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
}
