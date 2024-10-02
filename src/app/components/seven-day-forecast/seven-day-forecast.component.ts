import { Component, Input } from '@angular/core';
import { WeekData } from '../../models/WeekData';
import { MetricsConversionService } from '../../services/metrics-conversion.service';

@Component({
  selector: 'app-seven-day-forecast',
  templateUrl: './seven-day-forecast.component.html',
  styleUrl: './seven-day-forecast.component.css'
})
export class SevenDayForecastComponent {

  @Input() weekData!: WeekData[]; // Personalized data for the component

  constructor(public metricsConversionService: MetricsConversionService){}
}
