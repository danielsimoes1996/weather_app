import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetricsConversionService {

  public celsios: boolean = true;
  public kms: boolean = true;

  constructor() { }


  changeTempratureMetrics(type: 'celsios' | 'fahrenheit'): void{
    if(type === 'celsios'){
      this.celsios = true;
    }
    else{
      this.celsios = false;
    }
  }

  changeDistanceMetrics(type: 'kms' | 'miles'): void{
    if(type === 'kms'){
      this.kms = true;
    }
    else{
      this.kms = false;
    }
  }

  celsiosToFahrenheit(celsios: number): number{
    return (celsios * 9 / 5) +32;
  }

  kmToMiles(kilometers: number): number {
    return kilometers * 0.621371;
  }

}
