import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // url = "https://maps.openweathermap.org/maps/2.0/weather/1h/TA2/4/1/6?appid={b259c2309135af14a92d08fa1f215c9b}";
  url='https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=41f72717a5ea4dbc5382b1abc4679dea&units=metric'
  apiKey = "b259c2309135af14a92d08fa1f215c9b";
  constructor(private http:HttpClient) { }


//  getWeatherDataByCoords(lat: string | number | boolean,lon: string | number | boolean)
//  {
//     let params = new HttpParams()
//     .set('lat', lat)
//     .set('lon', lon)
//     .set('units', 'metric')
//     .set('appid', this.apiKey)
//     return this.http.get(this.url,{params});
//  }
//  getWeatherDataByCity(city: string)
//  {
//     return this.http.get(this.url,{params});
// }
getWeather(city: string){
  return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=b259c2309135af14a92d08fa1f215c9bdea&units=metric')
}

}