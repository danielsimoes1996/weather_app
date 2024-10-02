import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageDescriptionService {

  constructor() { }

  getImage(image_description: string): string{

    let cloud_sunny = 'cloud_sunny.png';
    let rain_sunny = 'rain_sunny.png';
    let windy = 'wind.png';
    let sunny = 'sunny.png';
    let rainy = 'rainy.png';

    if(String(image_description).includes("Cloudy") || String(image_description).includes("Partly Cloudy") || String(image_description).includes("P Cloudy") || String(image_description).includes("M Cloudy")) {
      return cloud_sunny;
    }
    else if(String(image_description).includes("Partly Rainy") || String(image_description).includes("P Rainy")){
      return rain_sunny;
    }
    else if(String(image_description).includes("Wind")){
      return windy;
    }
    else if(String(image_description).includes("Rain") || String(image_description).includes("PM Showers")){
      return rainy
    }
    return sunny
  }
}
