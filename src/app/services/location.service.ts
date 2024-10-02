import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocationInfo } from '../models/LocationInfo';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  private initialState: LocationInfo = {
    latitude: 0,
    longitude: 0,
    address: '',
    date: this.getCurrentDateFormatted()
  };

  private locationSubject = new BehaviorSubject(this.initialState);
  location$ = this.locationSubject.asObservable();

  constructor() { }

  updateLocation(latitude: number, longitude: number, address: string) {
    const newState = {
      latitude,
      longitude,
      address,
      date: this.getCurrentDateFormatted()
    };
    this.locationSubject.next(newState);
  }

  private getCurrentDateFormatted(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() retorna o mês de 0 a 11
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }
}
