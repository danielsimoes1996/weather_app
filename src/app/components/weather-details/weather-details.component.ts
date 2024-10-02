import { Component, Input } from '@angular/core';
import { AirConditions } from '../../models/AirConditions';
import { MetricsConversionService } from '../../services/metrics-conversion.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css'
})
export class WeatherDetailsComponent {

  @Input() airConditions!: AirConditions; // Personalized data for the component

  constructor(public metricsConversionService: MetricsConversionService){}
}
