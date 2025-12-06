import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionService, Champion } from '../../_service/champion.service';

@Component({
  selector: 'app-champion-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent implements OnInit {
  champions: Champion[] = [];
  loading = true;

  constructor(private championService: ChampionService) {}

  ngOnInit() {
    console.log('ChampionList ngOnInit');
    this.championService.getAll().subscribe((champions: Champion[]) => {
      console.log('Champions:', champions);
      this.champions = champions;

    });
  }
}
