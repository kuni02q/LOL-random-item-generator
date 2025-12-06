import { Component, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildService, Build } from '../../_service/build.service';
import {TooltipDirective} from '../../_directive/tooltip/tooltip.directive';

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
  buildFavorite = false;

  constructor(private buildService: BuildService, private cd: ChangeDetectorRef) {}

  generateBuild() {
    this.loading = true;
    this.error = undefined;
    this.buildFavorite = false;

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

  toggleBuildFavorite() {
    this.buildFavorite = !this.buildFavorite;
  }

}
