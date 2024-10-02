import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocationSearch } from '../../models/LocationSearch';
import { WeatherService } from '../../services/weather.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  searchForm: FormGroup;
  locationsSearch: LocationSearch | undefined;
  isLoading: boolean = false;

  @Output() search = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private weatherService: WeatherService, private locationService: LocationService){

    this.searchForm = this.fb.group({
      city: ['', Validators.required]
    });
  }
  

  onSubmit(): void{
    if (this.searchForm.valid) {
      const city = this.searchForm.value.city;
      this.isLoading = true;
      this.weatherService.searchLocation(city).subscribe((data: LocationSearch) => {
        this.locationsSearch = data;
        this.isLoading = false;
      },
      (error: any) => {
        //Demostration of error handling
        this.isLoading = false;
        console.error('Error fetching location data:', error);
      })
    }
  }

  selectLocation(index: number): void {
    if(this.locationsSearch && index >= 0) {
      const latitude = this.locationsSearch.location.latitude[index];
      const longitude = this.locationsSearch.location.longitude[index];
      const address = this.locationsSearch.location.city[index];
      this.locationService.updateLocation(latitude, longitude, address);
      this.resetFormAndLocations();
    }
    else{
      console.log('Invalid location');
    }
  }

  resetFormAndLocations(){
    this.locationsSearch = undefined;
    this.searchForm.reset();
  }

}
