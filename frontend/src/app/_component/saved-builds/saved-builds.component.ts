import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saved-builds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-builds.component.html',
  styleUrls: ['./saved-builds.component.scss']
})
export class SavedBuildsComponent {
  savedBuilds: { items: { imageUrl: string; name: string }[] }[] = [
    // Példa adatok
    { items: [

      ]
    }
  ];
}
