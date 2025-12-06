import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildService, Build } from '../../_service/build.service';
import { Item } from '../../_service/item.service';

@Component({
  selector: 'app-build-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './build-display.component.html',
  styleUrls: ['./build-display.component.scss']
})
export class BuildDisplayComponent {
  buildItems: Item[] = [];

  constructor(private buildService: BuildService) {}

  generateBuild() {
    this.buildService.generateRandomBuild().subscribe((build: Build) => {
      console.log('Generated Build:', build);
      this.buildItems = build.items;
    });
  }
}
