import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../model/weather';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(city: string): Observable<WeatherData>{
    return this.http.get<WeatherData>(
                  environment.BaseUrl,
                  {
                    headers: new HttpHeaders()
                    .set(environment.XRapidAPIHostHeaderName, environment.XRapidAPIHostHeaderValue)
                    .set(environment.XRapidAPIKeyHeaderName, environment.XRapidAPIKeyHeaderValue),
                    params: new HttpParams()
                    .set('q', city)
                    .set('days', 3)
                  });
  }
}
