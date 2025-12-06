import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Champion {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChampionService {
  private readonly rootUrl: string = '/api/champion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Champion[]> {
    return this.http.get<Champion[]>(this.rootUrl);
  }

  getOne(id: string): Observable<Champion> {
    return this.http.get<Champion>(`${this.rootUrl}/${id}`);
  }
}
