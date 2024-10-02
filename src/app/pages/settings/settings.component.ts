import { Component } from '@angular/core';
import { MetricsConversionService } from '../../services/metrics-conversion.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(public metricsConversionService: MetricsConversionService){}
}
