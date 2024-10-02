import { Component, Input } from '@angular/core';
import { TodayForecast } from '../../models/TodayForecast';
import { MetricsConversionService } from '../../services/metrics-conversion.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent {

  @Input() forecastData!: TodayForecast[]; // Personalized data for the component 
  constructor(public metricsConversionService: MetricsConversionService){}

}
