import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BuildFavorite {
  id: string;
  build: any;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private readonly rootUrl = '/api/favorites';

  constructor(private http: HttpClient) {}

  getAll(): Observable<BuildFavorite[]> {
    return this.http.get<BuildFavorite[]>(this.rootUrl);
  }

  add(buildId: string): Observable<BuildFavorite> {
    return this.http.post<BuildFavorite>(`${this.rootUrl}/${buildId}`, {});
  }

  remove(favoriteId: string): Observable<void> {
    return this.http.delete<void>(`${this.rootUrl}/${favoriteId}`);
  }
}
