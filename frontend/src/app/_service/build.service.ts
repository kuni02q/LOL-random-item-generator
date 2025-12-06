import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Champion } from './champion.service';
import { Item } from './item.service';

export interface Build {
  id: string;
  champion: Champion;
  items: Item[];
  created: string;
  updated: string;
}

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  private readonly rootUrl: string = '/api/build';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Build[]> {
    return this.http.get<Build[]>(this.rootUrl);
  }

  getOne(id: string): Observable<Build> {
    return this.http.get<Build>(`${this.rootUrl}/${id}`);
  }

  create(build: Build): Observable<Build> {
    return this.http.post<Build>(this.rootUrl, build);
  }

  update(build: Build): Observable<Build> {
    return this.http.put<Build>(this.rootUrl, build);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.rootUrl}/${id}`);
  }

  generateRandomBuild(): Observable<Build> {
    return this.http.post<Build>(`${this.rootUrl}/generate`, {});
  }
}
