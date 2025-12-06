import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildService, Build } from '../../_service/build.service';

@Component({
  selector: 'app-build-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './build-display.component.html',
  styleUrls: ['./build-display.component.scss']
})
export class BuildDisplayComponent {
  build?: Build;
  loading = false;
  error?: string;

  constructor(private buildService: BuildService) {}

  generateBuild() {
    this.loading = true;
    this.error = undefined;
    this.buildService.generateRandomBuild().subscribe({
      next: (b) => {
        this.build = b;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Error generating build';
        this.loading = false;
      }
    });
  }
}
