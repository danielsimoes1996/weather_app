import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { LocationInfo } from '../../models/LocationInfo';
import { WeatherService } from '../../services/weather.service';
import { LocationDetails } from '../../models/LocationDetails';
import { WeatherDetails } from '../../models/WeatherDetails';
import { TodayForecast } from '../../models/TodayForecast';
import { AirConditions } from '../../models/AirConditions';
import { ImageDescriptionService } from '../../services/image-description.service';
import { WeekData } from '../../models/WeekData';

@Component({ 
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  locationData: LocationInfo | undefined;

  // Data to share 
  currentWeather: LocationDetails; // Details of current weather
  forecastData: TodayForecast[] = []; // Details of the forecast
  airConditions: AirConditions; // Details on today's air conditions
  weekData: WeekData[] = []; // Next week forecast

  loadingData: boolean = false;


  constructor(private locationService: LocationService,  private weatherService: WeatherService, private imageDescription: ImageDescriptionService){}

  ngOnInit(): void {
    // Subscribes an observable and gets info of the location info 
    this.locationService.location$.subscribe(data => {
      this.locationData = data;
      if(data.address != '' && data.address.trim() !== ''){
        this.getLocationInfo(this.locationData)
      }
    });
  }

  // Gets the detail information about the weather on the chosen location
  getLocationInfo(data: LocationInfo): void{
    this.loadingData = true;
    this.weatherService.getLocationDetails(data.date, data.latitude, data.longitude).subscribe((response: WeatherDetails) => {
      this.loadingData = false;
      this.buildData(response)
    },
      (error: any) => {
        //Demostration of error handling
        this.loadingData = false;
        console.error('Error fetching location data:', error);
      })
  }

  // builds the personalized data for each component
  buildData(data: WeatherDetails): void{
    this.buildDataToCurrentWeather(data);
    this.buidlAirConditions(data);
    this.buildDataForecast(data);
    this.buildWeekData(data);
  }

  buildDataToCurrentWeather(data: WeatherDetails): void{
      this.currentWeather = new LocationDetails();
      this.currentWeather.day = data['v3-wx-observations-current'].dayOfWeek;
      this.currentWeather.location = this.locationData.address;
      this.currentWeather.temperature = data['v3-wx-observations-current'].temperature;
      this.currentWeather.image = this.imageDescription.getImage(data['v3-wx-observations-current'].wxPhraseShort);
  }

  buidlAirConditions(data: WeatherDetails): void{
    this.airConditions = new AirConditions();
    this.airConditions.airQuality = data['v3-wx-globalAirQuality'].globalairquality.airQualityCategoryIndex;
    this.airConditions.airQualityDescription = data['v3-wx-globalAirQuality'].globalairquality.airQualityCategory;
    this.airConditions.chanceOfRain = data['v3-wx-observations-current'].precip1Hour;
    this.airConditions.realFeel = data['v3-wx-observations-current'].temperatureFeelsLike;
    this.airConditions.uvIndex = data['v3-wx-observations-current'].uvIndex;
    this.airConditions.uvDescription = data['v3-wx-observations-current'].uvDescription;
    this.airConditions.visibility = data['v3-wx-observations-current'].visibility;
    this.airConditions.wind = data['v3-wx-observations-current'].windSpeed;
  }

  buildDataForecast(data: WeatherDetails): void{ 
    let day_counter = 0;
    while(day_counter <7){
      this.forecastData.push(new TodayForecast())
      this.forecastData[day_counter].hour = data['v3-wx-forecast-hourly-10day'].validTimeLocal[day_counter];
      this.forecastData[day_counter].temperature =  data['v3-wx-forecast-hourly-10day'].temperature[day_counter];
      this.forecastData[day_counter].image = this.imageDescription.getImage(data['v3-wx-forecast-hourly-10day'].wxPhraseShort[day_counter]);
      day_counter++;
    }
  }

  buildWeekData(data: WeatherDetails) : void{
    let week_counter = 1;
    let all_week_data: WeekData[] = [];
    while(week_counter <8){
      let week_data = new WeekData();
      week_data.day = data['v3-wx-forecast-daily-15day'].dayOfWeek[week_counter];
      week_data.tempMax = data['v3-wx-forecast-daily-15day'].temperatureMax[week_counter];
      week_data.tempMin = data['v3-wx-forecast-daily-15day'].temperatureMin[week_counter];
      week_data.image = this.imageDescription.getImage(data['v3-wx-forecast-daily-15day'].daypart[0].wxPhraseShort[week_counter]);
      week_data.description = data['v3-wx-forecast-daily-15day'].narrative[week_counter];
      all_week_data.push(week_data);
      week_counter++;
    }
    this.weekData = all_week_data;
  }



}
