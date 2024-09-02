import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = environment.weatherApiUrl;
  private apiKey = environment.weatherApiKey;

  constructor(private http: HttpClient) {}

  getWeatherAlerts(city: string): Observable<any> {
    const url = `${this.apiUrl}weather?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url).pipe(
      map((data: any) => {
        const weatherCondition = data.weather[0].main;
        const alerts: string[] = [];

        if (weatherCondition === 'Thunderstorm' || weatherCondition === 'Extreme') {
          alerts.push('Severe weather alert! Please stay indoors.');
        } else if (weatherCondition === 'Rain') {
          alerts.push('Heavy rain expected. Carry an umbrella!');
        } // Add more conditions as needed

        return { alerts, weather: data };
      })
    );
  }
}
