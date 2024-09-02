import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-w-alert',
  templateUrl: './w-alert.component.html',
  styleUrls: ['./w-alert.component.css']
})
export class WAlertComponent implements OnInit {
  weatherAlerts: string[] = [];
  weatherData: any;
  city: string = 'Trivandrum'; // Default city

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherAlerts(this.city);
  }

  getWeatherAlerts(city: string): void {
    this.weatherService.getWeatherAlerts(city).subscribe(
      (response) => {
        this.weatherAlerts = response.alerts;
        this.weatherData = response.weather;
      },
      (error) => {
        console.error('Error fetching weather data:', error);
        this.weatherAlerts = ['Unable to fetch weather data. Please try again later.'];
      }
    );
  }

  onCitySubmit(): void {
    if (this.city) {
      this.getWeatherAlerts(this.city);
    }
  }

}
