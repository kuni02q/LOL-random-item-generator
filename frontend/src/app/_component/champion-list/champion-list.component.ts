import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChampionService, Champion } from '../../_service/champion.service';

@Component({
  selector: 'app-champion-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent implements OnInit {
  champions: Champion[] = [];
  searchText: string = "";

  constructor(private championService: ChampionService) {}

  ngOnInit() {
    console.log('ChampionList ngOnInit');
    this.championService.getAll().subscribe((champions: Champion[]) => {
      console.log('Champions:', champions);
      this.champions = champions;

    });
  }

  filteredChampions() {
    return this.champions.filter(ch =>
      ch.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
