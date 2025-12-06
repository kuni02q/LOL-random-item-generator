import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  id: string;
  name: string;
  imageUrl: string;
  cost: number;
  into: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly rootUrl: string = '/api/item';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.rootUrl);
  }

  getOne(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.rootUrl}/${id}`);
  }
}
