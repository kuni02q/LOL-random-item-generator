import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService, Item } from '../../_service/item.service';
import {FormsModule} from '@angular/forms';
import {TooltipDirective} from '../../_directive/tooltip/tooltip.directive';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipDirective],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  searchText: string="";

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getAll().subscribe(items => {
      console.log('Items:', items);
      this.items = items;
    });
  }

  filteredItems() {
    return this.items.filter(it =>
      it.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
