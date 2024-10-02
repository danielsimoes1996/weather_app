import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { LocationDetails } from '../models/LocationDetails';
import { EnvironmentVariables } from '../Environment/EnvironmentVariables';
import { LocationSearch } from '../models/LocationSearch';
import { WeatherDetails } from '../models/WeatherDetails';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }


  getLocationDetails(date: string, latitude: number, longitude: number, lang: string = 'en-US', units: string = 'm'): Observable <WeatherDetails> {
    return this.httpClient.get<WeatherDetails>(EnvironmentVariables.apiForecastUrl, {
      headers: new HttpHeaders()
      .set(EnvironmentVariables.apiKeyName, EnvironmentVariables.apiKeyValue)
      .set(EnvironmentVariables.apiKeyHostName, EnvironmentVariables.apiKeyHostValue),
      params: new HttpParams()
      .set('date', date)
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('lang', lang)
      .set('units', units)
    }).pipe(
      catchError(this.handleError<WeatherDetails>('getLocationDetails'))
    );
  }

  searchLocation(city: string, lang: string = 'en-US'): Observable<LocationSearch> {
    return this.httpClient.get<LocationSearch>(EnvironmentVariables.apiLocationSearchUrl, {
      headers: new HttpHeaders()
      .set(EnvironmentVariables.apiKeyName, EnvironmentVariables.apiKeyValue)
      .set(EnvironmentVariables.apiKeyHostName, EnvironmentVariables.apiKeyHostValue),
      params: new HttpParams()
      .set('query', city)
      .set('language', lang)
    }).pipe(
      catchError(this.handleError<LocationSearch>('searchLocation'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

