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
        { imageUrl: 'https://via.placeholder.com/50', name: 'Item1' },
        { imageUrl: 'https://via.placeholder.com/50', name: 'Item2' },
        { imageUrl: 'https://via.placeholder.com/50', name: 'Item3' }
      ]
    }
  ];
}
