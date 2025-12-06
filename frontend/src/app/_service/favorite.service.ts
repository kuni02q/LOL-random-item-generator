import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

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

  private favoritesSubject = new BehaviorSubject<BuildFavorite[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<BuildFavorite[]> {
    return this.http.get<BuildFavorite[]>(this.rootUrl).pipe(
      tap(favs => this.favoritesSubject.next(favs))
    );
  }

  add(buildId: string): Observable<BuildFavorite> {
    return this.http.post<BuildFavorite>(`${this.rootUrl}/${buildId}`, {}).pipe(
      tap(fav => {
        const current = this.favoritesSubject.value;
        this.favoritesSubject.next([...current, fav]);
      })
    );
  }

  remove(favoriteId: string): Observable<void> {
    return this.http.delete<void>(`${this.rootUrl}/${favoriteId}`).pipe(
      tap(() => {
        const current = this.favoritesSubject.value.filter(f => f.id !== favoriteId);
        this.favoritesSubject.next(current);
      })
    );
  }
}
