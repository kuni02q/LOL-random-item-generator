import { Component, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildService, Build } from '../../_service/build.service';
import {TooltipDirective} from '../../_directive/tooltip/tooltip.directive';
import {FavoriteService, BuildFavorite} from '../../_service/favorite.service';

@Component({
  selector: 'app-build-display',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './build-display.component.html',
  styleUrls: ['./build-display.component.scss']
})
export class BuildDisplayComponent {
  build?: Build;
  loading = false;
  error?: string;
  buildFavoriteId: string | null = null;

  constructor(private buildService: BuildService, private favoriteService:FavoriteService, private cd: ChangeDetectorRef) {
    this.favoriteService.favorites$.subscribe(favs => {
      if (this.build) {
        const isFavorite = favs.some(f => f.build.id === this.build!.id);
        if (!isFavorite && this.buildFavoriteId) {
          this.buildFavoriteId = null;
          this.cd.detectChanges();
        }
      }
    });
  }

  generateBuild() {
    this.loading = true;
    this.error = undefined;
    this.buildFavoriteId = null;

    this.buildService.generateRandomBuild().subscribe({
      next: (b) => {
        this.build = b;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = err.message || 'Error generating build';
        this.loading = false;
      }
    });
  }

  toggleFavorite() {
    if (!this.build) return;

    // 1) Ha még nem kedvenc → hozzáadjuk
    if (!this.buildFavoriteId) {
      this.favoriteService.add(this.build.id).subscribe(fav => {
        this.buildFavoriteId = fav.id;
        this.cd.detectChanges();
      });
      return;
    }

    this.favoriteService.remove(this.buildFavoriteId).subscribe(() => {
      this.buildFavoriteId = null;
      this.cd.detectChanges();
    });
  }

  loadBuild(build: Build) {
    this.build = build;
    this.buildFavoriteId = null;
    this.favoriteService.favorites$.subscribe(favs => {
      const fav = favs.find(f => f.build.id === build.id);
      this.buildFavoriteId = fav?.id || null;
      this.cd.detectChanges();
    });
  }



}
