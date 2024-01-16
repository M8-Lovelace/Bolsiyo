import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Pixabay, PixabayCategory } from '@models/pixabay.model';
import { Observable } from 'rxjs';

Injectable({
  providedIn: 'root',
});
export class PixabayService {
  private http = inject(HttpClient);
  private readonly URL = 'https://pixabay.com/api/?key=';

  public getImages(
    query?: string,
    category?: PixabayCategory
  ): Observable<Pixabay> {
    const URL = `${this.URL}${environment.KEY}${
      category ? `&category=${category}` : ''
    }${query ? `&q=${query}` : ''}`;
    return this.http.get<Pixabay>(URL);
  }
}
