import { Weather } from './../models/weather.model';
import { Track } from './../models/track.model';
import { Resort } from './../models/resort.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Mountain } from '../models/mountain.model';
import { SkiPass } from '../models/skipass.model';

const baseURL = 'http://localhost:3000/api/skiresorts';

@Injectable({
  providedIn: 'root',
})
export class ResortsService {
  constructor(private http: HttpClient) {}

  getMountains(): Observable<Mountain[]> {
    return this.http.get(`${baseURL}`).pipe(
      map((elem: any) => {
        return (elem && elem.map((data: any) => new Mountain(data))) || [];
      })
    );
  }

  getResorts(resortId: number): Observable<Resort> {
    return this.http.get(`${baseURL}/${resortId}`).pipe(
      map((elem: any) => {
        return new Resort(elem);
      })
    );
  }

  getTracks(resortId: number, params?: any): Observable<Track[]> {
    let queryParams = {};
    if (params) {
      queryParams = {
        params: new HttpParams()
          .set('sort', params.sort || '')
          .set('sortDirection', params.sortDirection || ''),
      };
    }

    return this.http.get(`${baseURL}/${resortId}/tracks`, queryParams).pipe(
      map((elem: any) => {
        return (elem && elem.map((data: any) => new Track(data))) || [];
      })
    );
  }

  getWeather(resortId: number): Observable<Weather[]> {
    return this.http.get(`${baseURL}/${resortId}/weather`).pipe(
      map((elem: any) => {
        return (elem && elem.map((data: any) => new Weather(data))) || [];
      })
    );
  }

  getSkiPass(resortId: number): Observable<SkiPass[]> {
    return this.http.get(`${baseURL}/${resortId}/skipass`).pipe(
      map((elem: any) => {
        return (elem && elem.map((data: any) => new SkiPass(data))) || [];
      })
    );
  }
}
