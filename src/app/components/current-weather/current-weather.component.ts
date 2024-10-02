import { Component, Input } from '@angular/core';
import { LocationDetails } from '../../models/LocationDetails';
import { MetricsConversionService } from '../../services/metrics-conversion.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css'
})
export class CurrentWeatherComponent {

  @Input() currentWeather!: LocationDetails; // Personalized data for the component
  currentDate = new Date();

  constructor(public metricsConversionService: MetricsConversionService){}

}
